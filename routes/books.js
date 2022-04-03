let express = require("express");
let bodyParser = require("body-parser");
const Books = require("../models/books");
const {searchBookByTitle, searchBookByAuthor} = require('../controllers/searchBook');

let booksRouter = express.Router();
booksRouter.use(bodyParser.json());

booksRouter.route('/').get((req, res) => {
    Books.find({}).then((result) => {
        res.send(result);
    }).catch(err => {
        throw err;
    });
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
    }).then((result) => {
        res.send(result);
    }).catch(err => {
        throw err;
    })
});

booksRouter.route('/:id').get((req, res) => {
    Books.find({"bookID": req.params.id})
    .then((result) => {
        res.send(result);
    }).catch(err => {
        throw err;
    });
});

booksRouter.route('/:id').put((req, res) => {
    Books.updateOne({"bookID": req.params.id}, {
        averageRating: req.body.averageRating,
        ratingsCount: req.body.ratingsCount,
        textReviewsCount: req.body.textReviewsCount,
        totalQuantity: req.body.totalQuantity,
        stockAvailable: req.body.stockAvailable
    }).then((result) => {
        res.send({message: "Book with id: " + req.params.id + " updated Successfully"});
    }).catch(err => {
        throw err;
    });
});

booksRouter.route('/:id').delete((req, res) => {
    Books.deleteOne({
        "bookID": req.params.id
    }).then((result) => {
        res.send({message: "Book with id: " + req.params.id + " deleted Successfully"});
    }).catch(err => {
        throw err;
    });
});

booksRouter.route('/searchByTitle/:title').get(searchBookByTitle);

booksRouter.route('/searchByAuthor/:author').get(searchBookByAuthor);

module.exports = booksRouter;