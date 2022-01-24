const Books = require("../models/books");

function searchBookByTitle(req, res) {
    Books.find({"title": {$regex : req.params.title}},
    (err, book) => {
        if (err) {
            throw err;
        } else {
            res.send(book);
        }
    })
};

function searchBookByAuthor(req, res) {
    Books.find({"authors": {$regex : req.params.author}}, (err, book) => {
        if (err) {
            throw err;
        } else {
            res.send(book);
        }
    })
};

module.exports = {searchBookByAuthor, searchBookByTitle}