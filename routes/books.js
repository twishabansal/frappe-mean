let express = require("express");
var bodyParser = require("body-parser");
const Books = require("../models/books");

let booksRouter = express.Router();
booksRouter.use(bodyParser.json());

booksRouter.route('/').get((req, res) => {
    Books.find({}, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
});

booksRouter.route('/').post((req, res) => {
    Books.create({
        bookID: req.body.bookID, 
        title: req.body.title, 
        authors: req.body.authors, 
        averageRating: req.body.averageRating,
        isbn: req.body.isbn,
        isbn13: req.body.isbn13,
        languageCode: req.body.languageCode,
        numPages: req.body.numPages,
        ratingsCount: req.body.ratingsCount,
        textReviewsCount: req.body.textReviewsCount,
        publicationDate: req.body.publicationDate,
        publisher: req.body.publisher,
        totalQuantity: req.body.numBook,
        stockAvailable: req.body.numBook
    }, (err, result) => {
        if (err) {
            throw err;
        } 
        res.send(result);
    })
});

booksRouter.route('/:id').get((req, res) => {
    Books.find({"bookID": req.params.id}, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
});

booksRouter.route('/:id').put((req, res) => {
    Books.updateOne({"bookID": req.params.id}, {
        averageRating: req.body.averageRating,
        ratingsCount: req.body.ratingsCount,
        textReviewsCount: req.body.textReviewsCount,
        totalQuantity: req.body.totalQuantity,
        stockAvailable: req.body.stockAvailable
    }, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send({message: "Book with id: " + req.params.id + " updated Successfully"});
        }
    })
});

booksRouter.route('/:id').delete((req, res) => {
    Books.deleteOne({
        "bookID": req.params.id
    }, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send({message: "Book with id: " + req.params.id + " deleted Successfully"});
        }
    })
});

module.exports = booksRouter;