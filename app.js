const express = require("express");
const app = express();
const path = require("node:path");
const PORT = 3000;

app.use(express.static(__dirname + "/public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { allPokemonRouter } = require("./routers/fetchpokemonrouter");

app.use("/", allPokemonRouter);

app.listen(PORT, console.log(`listening to ${PORT}`));
