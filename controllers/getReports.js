const Members = require("../models/members");
const Books = require("../models/books");

async function getReport(req, res) {
    try {
        let highestPayingMembers = await Members.find().sort({"totalPaidTillDate" : "desc"}).limit(5);
        try {
            let highestRentedBooks =  await Books.find().sort({"numTimesRented" : "desc"}).limit(5);
            res.send({"highestPayingMembers" : highestPayingMembers, "highestRentedBooks": highestRentedBooks});
        } catch (err) {
            throw err;
        }
    } catch (err) {
        throw err;
    }
}
 
module.exports = {getReport};