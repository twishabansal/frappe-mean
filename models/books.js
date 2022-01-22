const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    bookId: String,
    title: String,
    authors: String,
    averageRating: String,
    isbn: String,
    isbn: String,
    languageCode: String,
    numPages: Number,
    ratingsCount: Number,
    textReviewsCount: Number,
    publicationDate: Date,
    publisher: String,
    totalQuantity: Number,
    stockAvailable: Number
});

let Books = mongoose.model('Book', BooksSchema);
module.exports = Books;