const Router = require("express");

const allPokemonRouter = Router();
const allPokemonRouterDb = Router();
const selectedPokemonsRouter = Router();
const deletePokemonRouter = Router();
const updateteamRouter = Router();

const {
  renderAllPokemons,
  renderAllPokemonsDb,
  insertPokemonsController,
  showTrainerTeam,
  deleteTeamController,
  updateTeamController,
  showUpdateForm,
} = require("../controllers/renderFromDbController");

allPokemonRouter.get("/", renderAllPokemons);
allPokemonRouterDb.get("/", renderAllPokemonsDb);
selectedPokemonsRouter.post("/", insertPokemonsController);
selectedPokemonsRouter.get("/:trainer", showTrainerTeam);
deletePokemonRouter.post("/:trainer", deleteTeamController);
updateteamRouter.get("/:trainer", showUpdateForm);
updateteamRouter.post("/:trainer", updateTeamController);

module.exports = {
  allPokemonRouter,
  allPokemonRouterDb,
  selectedPokemonsRouter,
  deletePokemonRouter,
  updateteamRouter,
};
