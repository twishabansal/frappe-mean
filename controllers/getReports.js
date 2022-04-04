const Members = require("../models/members");
const Books = require("../models/books");

function getReport(req, res) {
    Members.find().sort({"totalPaidTillDate" : "desc"}).limit(5).then((highestPayingMembers) => {
        Books.find().sort({"numTimesRented" : "desc"}).limit(5).then((highestRentedBooks) => {
            res.send({"highestPayingMembers" : highestPayingMembers, "highestRentedBooks": highestRentedBooks});
        }).catch((err) => {
            throw err;
        })
    }).catch((err) => {
        throw err;
    });
}
 
module.exports = {getReport};