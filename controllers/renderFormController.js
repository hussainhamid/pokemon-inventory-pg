const db = require("../db/query")


async function renderFormGet(req, res) {
    const pokemons = await db.getAllPokemons()

    res.render("form", {allPokemons: pokemons})
}

module.exports =  renderFormGet