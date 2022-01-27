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

async function importData(req, res) {
    var numBooks = req.params.numBooks;
    var pageNum = 1;
    var numBooksImported = 0;
    while (numBooksImported < numBooks) {
        try {
            let booksMsg = await axios.get(FRAPPE_API_URL, {
                params: {
                    page: pageNum
                }
            });
            for (book in booksMsg.data['message']) {
                var newBook = changeImportSchema(booksMsg.data['message'][book]);
                try {
                    let bookExists = await Books.exists({"bookID": newBook.bookID});
                    if (bookExists) {
                        console.log('Book with BookID' + newBook.bookID + ' already present');
                    } else {
                        Books.create(newBook);
                        numBooksImported++;
                        if (numBooksImported == numBooks) {
                            res.send('Books Successfully imported');
                            return;
                        }
                    }
                } catch (err) {
                    throw err;
                }
            }
        } catch (err) {
            throw err;
        }
        pageNum++;
    }
}

module.exports = {importData};