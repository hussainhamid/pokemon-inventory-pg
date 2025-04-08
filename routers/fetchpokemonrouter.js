const Router = require("express");
const {
  fetchAllPokemon,
  fetchPokemonData,
} = require("../controllers/fetchpokemoncontroller");

const allPokemonRouter = Router();

allPokemonRouter.get("/", async (req, res) => {
  try {
    const data = await fetchAllPokemon();

    const pokeDataArray = [];

    for (const pokemon of data.results) {
      const pokemonUrl = pokemon.url;

      const pokemonData = await fetchPokemonData(pokemonUrl);

      const pokemonName = pokemonData.name;
      const pokemonGeneration = pokemonData.generation.name;
      pokeDataArray.push({
        name: pokemonName,
        generation: pokemonGeneration,
      });
    }

    console.log("pokeNames:", pokeDataArray);
    res.render("displayallpokemon", { allPokemons: pokeDataArray });
  } catch (err) {
    console.error("an error occured in the router", err);
  }
});

module.exports = {
  allPokemonRouter,
};
