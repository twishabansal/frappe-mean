let express = require("express");
let bodyParser = require("body-parser");
const {getReport} = require('../controllers/getReports');

let reportsRouter = express.Router();
reportsRouter.use(bodyParser.json());

reportsRouter.route('/').get(getReport);

module.exports = reportsRouter;