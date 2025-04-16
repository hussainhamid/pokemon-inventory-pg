require("dotenv").config();
const pool = require("./pool");


async function getAllPokemons() {
    const {rows} = await pool.query("SELECT * FROM all_pokemons");
    return rows;
}

module.exports = {
    getAllPokemons
}