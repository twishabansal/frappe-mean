let express = require("express");
let bodyParser = require("body-parser");
const {importDataUsingParams} = require('../controllers/importData');

let dataImportRouter = express.Router();
dataImportRouter.use(bodyParser.json());

dataImportRouter.route('/').post(importDataUsingParams);

module.exports = dataImportRouter;