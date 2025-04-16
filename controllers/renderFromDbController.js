const db = require("../db/query");

async function renderPokemonDb(req, res) {
    const pokemons = await db.getAllPokemons();

    res.render("displayFromDb", {allPokemons: pokemons})
}

module.exports = renderPokemonDb;