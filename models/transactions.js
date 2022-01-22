const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({
    bookId: String,
    memberId: String,
    transactionType: String, // borrow, return or payment
    amountOwed: Number,
    amountPaid: Number
}, {
    timestamp: true
});

let Transactions = mongoose.model('Transaction', TransactionsSchema);
module.exports = Transactions;