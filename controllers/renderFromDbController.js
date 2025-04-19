const db = require("../db/query");

async function renderAllPokemonsDb(req, res) {
  const pokemons = await db.getAllPokemons();

  res.render("displayFromDb", { allPokemons: pokemons });
}

async function renderAllPokemons(req, res) {
  const trainers = await db.getAlltrainers();

  const pokemons = await db.getAllPokemons();

  res.render("displayallpokemon", {
    allPokemons: pokemons,
    trainers: trainers,
  });
}

async function insertPokemonsController(req, res) {
  const trainer = req.body.trainer;
  const secret = req.body.password;

  if (secret !== process.env.SECRET_PASSWORD_ENV) {
    return res
      .status(401)
      .send("Unauthorized: Incorrect password. You shall not pass!!");
  }

  const pokeIds = [
    req.body.pokemon1,
    req.body.pokemon2,
    req.body.pokemon3,
    req.body.pokemon4,
    req.body.pokemon5,
    req.body.pokemon6,
  ].map(Number);

  await db.insertIntoPokemonTeam(trainer, pokeIds);

  const pokemons = await db.getSelectedPokemons(trainer);

  res.render("selectedPokemons", { trainer, allPokemons: pokemons });
}

async function showTrainerTeam(req, res) {
  const trainer = req.params.trainer;

  const pokemons = await db.getSelectedPokemons(trainer);
  res.render("selectedPokemons", {
    trainer,
    allPokemons: pokemons,
  });
}

async function deleteTeamController(req, res) {
  const trainer = req.params.trainer;
  const secret = req.body.password;

  if (secret !== process.env.SECRET_PASSWORD_ENV) {
    return res
      .status(401)
      .send("Unauthorized: Incorrect password. You shall not pass!!");
  }

  await db.deleteTeam(trainer);

  res.redirect("/");
}

async function showUpdateForm(req, res) {
  const trainer = req.params.trainer;
  const pokemons = await db.getAllPokemons();

  res.render("updateTeam", { trainer, allPokemons: pokemons });
}

async function updateTeamController(req, res) {
  const trainer = req.params.trainer;
  const secret = req.body.password;

  if (secret !== process.env.SECRET_PASSWORD_ENV) {
    return res
      .status(401)
      .send("Unauthorized: Incorrect password. You shall not pass!!");
  }

  const pokeIds = [
    req.body.pokemon1,
    req.body.pokemon2,
    req.body.pokemon3,
    req.body.pokemon4,
    req.body.pokemon5,
    req.body.pokemon6,
  ].map(Number);

  await db.updateTeam(trainer, pokeIds);

  const pokemons = await db.getSelectedPokemons(trainer);

  res.render("selectedPokemons", {
    trainer,
    allPokemons: pokemons,
  });
}

module.exports = {
  renderAllPokemonsDb,
  renderAllPokemons,
  insertPokemonsController,
  showTrainerTeam,
  deleteTeamController,
  updateTeamController,
  showUpdateForm,
};
