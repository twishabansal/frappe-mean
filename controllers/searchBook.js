const Books = require("../models/books");

function searchBookByTitle(req, res) {
    Books.find({"title": {$regex : req.params.title}})
    .then((book) => {
        res.send(book);
    }).catch((err) => {
        throw err;
    });
};

function searchBookByAuthor(req, res) {
    Books.find({"authors": {$regex : req.params.author}})
    .then((book) => {
        res.send(book);
    }).catch((err) => {
        throw err;
    });
};

module.exports = {searchBookByAuthor, searchBookByTitle}