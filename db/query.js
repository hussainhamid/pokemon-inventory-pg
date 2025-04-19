require("dotenv").config();
const pool = require("./pool");

async function getAllPokemons() {
  const { rows } = await pool.query("SELECT * FROM all_pokemons");
  return rows;
}

async function insertIntoPokemonTeam(trainer, pokeIds) {
  await pool.query(
    `INSERT INTO pokemon_team (trainer, poke_ids)
    VALUES ($1, $2) 
    `,
    [trainer, pokeIds]
  );
}

async function getSelectedPokemons(trainer) {
  const { rows: trainerRows } = await pool.query(
    `
    SELECT poke_ids FROM pokemon_team WHERE trainer = $1
    `,
    [trainer]
  );

  if (trainerRows.length === 0) {
    return [];
  }

  const pokeIds = trainerRows[0].poke_ids;

  const { rows } = await pool.query(
    `
    SELECT * FROM all_pokemons WHERE poke_id = ANY($1::int[])`,
    [pokeIds]
  );

  return rows;
}

async function getAlltrainers() {
  const { rows } = await pool.query("SELECT trainer FROM pokemon_team");

  return rows.map((row) => row.trainer);
}

async function deleteTeam(trainer) {
  await pool.query(`DELETE FROM pokemon_team WHERE trainer = $1`, [trainer]);
}

async function updateTeam(trainer, poke_ids) {
  const { rows } = await pool.query(
    `UPDATE pokemon_team SET poke_ids = $1 WHERE trainer = $2`,
    [poke_ids, trainer]
  );

  return rows;
}

module.exports = {
  getAllPokemons,
  insertIntoPokemonTeam,
  getSelectedPokemons,
  getAlltrainers,
  deleteTeam,
  updateTeam,
};
