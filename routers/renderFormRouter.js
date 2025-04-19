const Router = require("express")

const renderFormRouter = Router();

const renderFormGet = require("../controllers/renderFormController")


renderFormRouter.get("/", renderFormGet)


module.exports = renderFormRouter