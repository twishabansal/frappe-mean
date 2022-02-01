const axios = require('axios');
const Books = require('../models/books')

const FRAPPE_API_URL = 'https://frappe.io/api/method/frappe-library?'

function changeImportSchema(book) {
    return {
        bookID: book.bookID,
        title: book.title,
        authors: book.authors,
        averageRating: book.average_rating,
        isbn: book.isbn,
        isbn13: book.isbn13,
        languageCode: book.language_code,
        numPages: book.num_pages,
        ratingsCount: book.ratings_count,
        textReviewsCount: book.text_reviews_count,
        publicationDate: book.publication_date,
        publisher: book.publisher
    };
}

async function importDataUsingParams(req, res) {
    let pageNum = 1;
    parameters = {'page' : pageNum};
    if (req.body.hasOwnProperty('numBooks')) {
        parameters['numBooks'] = req.body.numBooks;
    }
    if (req.body.hasOwnProperty('eachBookQuantity')) {
        parameters['eachBookQuantity'] = req.body.eachBookQuantity;
    }
    if (req.body.hasOwnProperty('title')) {
        parameters['title'] = req.body.title;
    }
    if (req.body.hasOwnProperty('authors')) {
        parameters['authors'] = req.body.authors;
    }
    if (req.body.hasOwnProperty('isbn')) {
        parameters['isbn'] = req.body.isbn;
    }
    if (req.body.hasOwnProperty('publisher')) {
        parameters['publisher'] = req.body.publisher;
    }
    let numBooksImported = 0;
    let numBooksDuplicates = 0;
    while (numBooksImported + numBooksDuplicates < parameters.numBooks) {
        try {
            let booksMsg = await axios.get(FRAPPE_API_URL, {
                params: parameters
            });
            for (book in booksMsg.data['message']) {
                let newBook = changeImportSchema(booksMsg.data['message'][book]);
                try {
                    let bookExists = await Books.exists({"bookID": newBook.bookID});
                    if (bookExists) {
                        console.log('Book with BookID' + newBook.bookID + ' already present');
                        numBooksDuplicates++;
                    } else {
                        Books.create(newBook);
                        numBooksImported++;
                    }
                    if (numBooksImported + numBooksDuplicates == parameters.numBooks) {
                        res.send(numBooksImported + ' out of ' + parameters.numBooks + ' Books Successfully imported');
                        return;
                    }
                } catch (err) {
                    throw err;
                }
            }
        } catch (err) {
            throw err;
        }
        pageNum++;
        parameters['page'] = pageNum;
    }    
}

module.exports = {importDataUsingParams};