let express = require("express");
var bodyParser = require("body-parser");
const Transactions = require("../models/transactions");
const {bookIssue, bookReturn, chargeRent} = require('../controllers/addTransaction');

let transactionsRouter = express.Router();
transactionsRouter.use(bodyParser.json());

transactionsRouter.route('/').get((req, res) => {
    Transactions.find({}, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
})

transactionsRouter.route('/borrow/:memberID/:bookID').post(bookIssue);

transactionsRouter.route('/return/:memberID/:bookID').post(bookReturn);

transactionsRouter.route('/rent/:memberID/:bookID').get(chargeRent);

module.exports = transactionsRouter;