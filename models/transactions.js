const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({
    bookID: String,
    memberID: String,
    transactionType: String, // borrow or return
    amountOwed: {type: Number, default: 0},
    amountPaid: {type: Number, default: 0}
}, {
    timestamp: true
});

let Transactions = mongoose.model('Transaction', TransactionsSchema);
module.exports = Transactions;