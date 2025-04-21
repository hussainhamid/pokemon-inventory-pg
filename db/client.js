require("dotenv").config();
const { Client } = require("pg");

const {
  fetchAllPokemon,
  fetchPokemonData,
} = require("../controllers/fetchpokemoncontroller");

//local db

// const client = new Client({
//   host: process.env.LOCALHOST_ENV,
//   user: process.env.USER_ENV,
//   database: process.env.DATABASE_ENV,
//   password: process.env.PASS_ENV,
//   port: process.env.DB_PORT_ENV,
// });

//production db

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function insertPokemons({ name, poke_Id, type, poke_img_url }) {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS all_pokemons (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT,
        poke_id INTEGER,
        poke_type TEXT[],
        poke_img_url TEXT 
    );
  `;

  const SQL = `

    INSERT INTO all_pokemons (name, poke_id, poke_type, poke_img_url)
    VALUES ($1, $2, $3, $4);
    `;

  const createPokemonTeamTable = `
      CREATE TABLE IF NOT EXISTS pokemon_team (
          id INTEGER GENERATED ALWAYS AS IDENTITY,
          trainer TEXT,
          poke_ids INTEGER[]
      );
    `;

  const values = [name, poke_Id, type, poke_img_url];

  await client.query(createTableSQL);
  await client.query(SQL, values);
  await client.query(createPokemonTeamTable);
}

async function main() {
  try {
    console.log("seeding...");

    await client.connect();

    const data = await fetchAllPokemon();

    if (!data || !data.results) {
      return res.status(500).send("Failed to load Pokémon data");
    }

    const allPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        try {
          const pokemonUrl = await pokemon.url;
          const pokemonData = await fetchPokemonData(pokemonUrl);

          const pokemonId = pokemonData.id;
          const pokemonName = pokemonData.name;
          const pokeType = pokemonData.types.map((t) => t.type.name);
          const pokeImg =
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png` ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

          return {
            poke_Id: pokemonId,
            name: pokemonName,
            type: pokeType,
            poke_img_url: pokeImg,
          };
        } catch (err) {
          console.error("failed in the pokemonRouter", err);
          return null;
        }
      })
    );

    for (const pokemon of allPokemons) {
      await insertPokemons(pokemon);
      console.log(`inserted pokemon: ${pokemon.name}`);
    }

    await client.end();
    console.log("all pokemons inserted");
  } catch (err) {
    console.error("an error occured in the client.js", err);
  }
}

main();
