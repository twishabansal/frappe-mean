const mongoose = require('mongoose');

const MembersSchema = new mongoose.Schema({
    memberID: String,
    name: String,
    contactNo : String,
    dateOfJoining : Date,
    currentBooksIssued: [String],
    outstandingDebt: Number,
    totalPaidTillDate: Number
}, { versionKey: false });

let Members = mongoose.model('Member', MembersSchema);
module.exports = Members;