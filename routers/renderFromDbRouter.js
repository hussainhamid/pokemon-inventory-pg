const Router = require("express");

const renderFromDbRouter = Router();
const renderFromDbController = require("../controllers/renderFromDbController");

renderFromDbRouter.get("/", renderFromDbController)

module.exports = renderFromDbRouter;