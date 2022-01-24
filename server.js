let express = require('express');
let bodyparser = require('body-parser');
let app = express();
let cors = require('cors');

require('./db')();

let pingRouter = require('./routes/ping');
let booksRouter = require('./routes/books');
let membersRouter = require('./routes/members');
let transactionsRouter = require('./routes/transactions');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use("/ping", pingRouter);
app.use("/books", booksRouter);
app.use("/members", membersRouter);
app.use("/transactions", transactionsRouter);

module.exports = app;