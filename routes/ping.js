let express = require("express");
let pingRouter = express.Router();

pingRouter.get('/', (req, res) => {
    res.send('Ping Successful!');
});

module.exports = pingRouter;