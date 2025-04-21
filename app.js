const express = require("express");
const app = express();
require("dotenv").config();
const path = require("node:path");
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const {
  allPokemonRouter,
  allPokemonRouterDb,
  selectedPokemonsRouter,
  deletePokemonRouter,
  updateteamRouter,
} = require("./routers/renderPokemonRouter");
const renderFormRouter = require("./routers/renderFormRouter");

app.get("/", (req, res) => {
  console.log("app is working");
});

app.use("/", allPokemonRouter);
app.use("/db", allPokemonRouterDb);
app.use("/form", renderFormRouter);
app.use("/new", selectedPokemonsRouter);
app.use("/delete", deletePokemonRouter);
app.use("/update", updateteamRouter);

app.listen(PORT, "0.0.0.0", console.log(`listening to ${PORT}`));
