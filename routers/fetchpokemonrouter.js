const Router = require("express");
// const {
//   fetchAllPokemon,
//   fetchPokemonData,
// } = require("../controllers/fetchpokemoncontroller");

// const allPokemonRouter = Router();

// allPokemonRouter.get("/", async (req, res) => {
//   try {
//     const data = await fetchAllPokemon();

//     if (!data || !data.results) {
//       return res.status(500).send("Failed to load Pokémon data");
//     }

//     const allPokemons = await Promise.all(
//       data.results.map(async (pokemon) => {
//         try {
//           const pokemonUrl = await pokemon.url;
//           const pokemonData = await fetchPokemonData(pokemonUrl);

//           const pokemonId = pokemonData.id;
//           const pokemonName = pokemonData.name;
//           const eachPokemonUrl = pokemonUrl;
//           const pokeImg =
//             `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png` ||
//             `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
//           const pokeType = pokemonData.types.map((t) => t.type.name);

//           return {
//             pokeId: pokemonId,
//             name: pokemonName,
//             img: pokeImg,
//             type: pokeType,
//             pokeUrl: eachPokemonUrl,
//           };
//         } catch (err) {
//           console.error("failed in the pokemonRouter", err);
//           return null;
//         }
//       })
//     );

//     const filteredPokemons = allPokemons.filter(Boolean);

//     res.render("displayallpokemon", {
//       allPokemons: filteredPokemons,
//     });
//   } catch (err) {
//     console.error("an error occured in the router", err);
//   }
// });

const allPokemonRouter = Router();

const renderAllPokemons = require("../controllers/renderFromDbController")

allPokemonRouter.get("/", renderAllPokemons)

module.exports = {
  allPokemonRouter,
};
