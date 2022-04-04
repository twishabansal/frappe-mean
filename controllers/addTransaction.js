const Transactions = require("../models/transactions");
const Books = require("../models/books");
const Members = require("../models/members");

function bookIssue(req, res) {
    let bookID = req.params.bookID;
    let memberID = req.params.memberID;
    let newRent = req.body.rentAmount;
    Members.findOne({"memberID": memberID}).then((member) => {
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
    }).catch((err) => {
        throw err;
    });
    
    Members.updateOne({"memberID": memberID},
        { $push: { "currentBooksIssued": {"bookID": bookID, "rentOwed": newRent}},  $inc: {"outstandingDebt": newRent}}).then((member) => {
            console.log('Member updated successfully');
        }).catch((err) => {
            throw err;
        });

    Books.updateOne({"bookID": bookID}, {$inc: {"stockAvailable": -1, "numTimesRented" :1}})
    .then((book) => {
        console.log('Book updated successfully');
    }).catch((err) => {
        throw err;
    });

    Transactions.create({
        bookID: bookID,
        memberID: memberID,
        transactionType: "borrow",
        amountOwed: newRent,
    }).then((transaction) => {
        console.log('A Borrow Transaction created successfully');
        res.send(transaction);
    }).catch((err) => {
        throw err;
    });
}

function bookReturn(req, res) {
    let bookID = req.params.bookID;
    let memberID = req.params.memberID;
    let amountPaid = req.body.rentPaid;
    Members.updateOne({"memberID": memberID},
        { $pull: { "currentBooksIssued": {"bookID" : bookID, "rentOwed": amountPaid}},  $inc: {"outstandingDebt": -1 * amountPaid}})
        .then((member) => {
            console.log('Member updated successfully');
        }).catch((err) => {
            throw err;
        });

    Books.updateOne({"bookID": bookID}, {$inc: {"stockAvailable": 1}}).then((book) => {
        console.log('Book updated successfully');
    }).catch((err) => {
        throw err;
    });

    Transactions.create({
        bookID: bookID,
        memberID: memberID,
        transactionType: "return",
        amountPaid: amountPaid
    }).then((transaction) => {
        console.log('A Return Transaction created successfully');
        res.send(transaction);
    }).catch((err) => {
        throw err;
    });
}

function chargeRent(req, res) {
    let memberID = req.params.memberID;
    let bookID = req.params.bookID;
    Members.findOne({"memberID": memberID})
    .then((member) => {
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
    }).catch((err) => {
        throw err;
    });
}

module.exports = {bookIssue, bookReturn, chargeRent};