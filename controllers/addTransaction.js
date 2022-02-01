const Transactions = require("../models/transactions");
const Books = require("../models/books");
const Members = require("../models/members");

async function bookIssue(req, res) {
    var bookID = req.params.bookID;
    var memberID = req.params.memberID;
    var newRent = req.body.rentAmount;
    try {
        let member = await Members.findOne({"memberID": memberID});
        if (member.currentBooksIssued) {
            for (bookIssued of member.currentBooksIssued) {
                if (bookIssued["bookID"] == bookID) {
                    res.send("Book already issued by Member");
                    return;
                }
            }
        } 
        if (member['outstandingDebt'] + newRent > 500) {
            res.send('Cannot issue book to member since outstanding debt becomes more than 500.');
            return;
        }
    } catch (err) {
        throw err;
    }
    
    Members.updateOne({"memberID": memberID},
        { $push: { "currentBooksIssued": {"bookID": bookID, "rentOwed": newRent}},  $inc: {"outstandingDebt": newRent}}, (err, member) => {
            if (err) {
                throw err;
            } else {
                console.log('Member updated successfully');
            }
        }
    );
    Books.updateOne({"bookID": bookID}, {$inc: {"stockAvailable": -1, "numTimesRented" :1}}, (err, book) => {
        if (err) {
            throw err;
        } else {
            console.log('Book updated successfully');
        }
    });
    Transactions.create({
        bookID: bookID,
        memberID: memberID,
        transactionType: "borrow",
        amountOwed: newRent,
    }, (err, transaction) => {
        if (err) {
            throw err;
        } else {
            console.log('A Borrow Transaction created successfully');
            res.send(transaction);
        }
    });
}

function bookReturn(req, res) {
    var bookID = req.params.bookID;
    var memberID = req.params.memberID;
    var amountPaid = req.body.rentPaid;
    Members.updateOne({"memberID": memberID},
        { $pull: { "currentBooksIssued": {"bookID" : bookID, "rentOwed": amountPaid}},  $inc: {"outstandingDebt": -1 * amountPaid}}, (err, member) => {
            if (err) {
                throw err;
            } else {
                console.log('Member updated successfully');
            }
        }
    );
    Books.updateOne({"bookID": bookID}, {$inc: {"stockAvailable": 1}}, (err, book) => {
        if (err) {
            throw err;
        } else {
            console.log('Book updated successfully');
        }
    });
    Transactions.create({
        bookID: bookID,
        memberID: memberID,
        transactionType: "return",
        amountPaid: amountPaid
    }, (err, transaction) => {
        if (err) {
            throw (err) 
        } else {
            console.log('A Return Transaction created successfully');
            res.send(transaction);
        }
    });
}

function chargeRent(req, res) {
    var memberID = req.params.memberID;
    var bookID = req.params.bookID;
    Members.findOne({"memberID": memberID}, (err, member) => {
        if (err) {
            throw err;
        } else {
            console.log('Member with ID ' + memberID + ' successfully found');
            if (member.currentBooksIssued) {
                for (bookIssued of member.currentBooksIssued) {
                    if (bookIssued["bookID"] == bookID) {
                        res.send(bookIssued);
                        return;
                    }
                }
            } else {
                res.send({"message" : "No Book Issued by Member"});
            }
        }
    });
}

module.exports = {bookIssue, bookReturn, chargeRent};