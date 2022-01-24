const mongoose = require('mongoose');

const bookIssuedSchema = new mongoose.Schema({
    bookID: String,
    rentOwed: Number
});

const MembersSchema = new mongoose.Schema({
    memberID: String,
    name: String,
    contactNo : String,
    dateOfJoining : Date,
    currentBooksIssued: [bookIssuedSchema],
    outstandingDebt: {type: Number, default: 0},
    totalPaidTillDate: {type: Number, default: 0}
}, { versionKey: false });

let Members = mongoose.model('Member', MembersSchema);
module.exports = Members;