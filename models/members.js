const mongoose = require('mongoose');

const MembersSchema = new mongoose.Schema({
    memberId: String,
    name: String,
    contactNo : String,
    dateOfJoining : Date,
    currentBooksIssued: Number,
    outstandingDebt: Number,
    totalPaidTillDate: Number
});

let Members = mongoose.model('Member', MembersSchema);
module.exports = Members;