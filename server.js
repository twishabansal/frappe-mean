let express = require('express');
let bodyparser = require('body-parser');
let app = express();
let cors = require('cors');

let pingRouter = require('./routes/ping');
// let booksRouter = require('./routes/books');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use("/ping", pingRouter);
// app.use("/books", booksRouter);

app.listen(3000);
console.log("Server listening on port 3000");