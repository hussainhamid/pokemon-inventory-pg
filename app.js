const express = require("express");
const app = express();
require("dotenv").config();
const path = require("node:path");
const PORT = 3000;

app.use(express.static(__dirname + "/public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { allPokemonRouter } = require("./routers/fetchpokemonrouter");
const renderFromDbRouter = require("./routers/renderFromDbRouter")

app.use("/", allPokemonRouter);
app.use("/db", renderFromDbRouter);


app.listen(PORT, console.log(`listening to ${PORT}`));
