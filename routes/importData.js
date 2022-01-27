let express = require("express");
var bodyParser = require("body-parser");
const {importData} = require('../controllers/importData');

let dataImportRouter = express.Router();
dataImportRouter.use(bodyParser.json());

dataImportRouter.route('/:numBooks').get(importData);

module.exports = dataImportRouter;