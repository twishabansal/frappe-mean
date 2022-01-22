const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    bookID: String,
    title: String,
    authors: String,
    averageRating: String,
    isbn: String,
    isbn13: String,
    languageCode: String,
    numPages: String,
    ratingsCount: String,
    textReviewsCount: String,
    publicationDate: String,
    publisher: String,
    totalQuantity: Number,
    stockAvailable: Number
}, { versionKey: false });

let Books = mongoose.model('Book', BooksSchema);
module.exports = Books;