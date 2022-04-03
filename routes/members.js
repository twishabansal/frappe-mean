let express = require("express");
let bodyParser = require("body-parser");
const Members = require("../models/members");

let membersRouter = express.Router();
membersRouter.use(bodyParser.json());

membersRouter.route('/').get((req, res) => {
    Members.find({}).then((result) => {
        res.send(result);
    }).catch((err) => {
        throw err;
    })
});

membersRouter.route('/').post((req, res) => {
    Members.create({
        memberID: req.body.memberID, 
        name: req.body.name,
        contactNo: req.body.contactNo,
        dateOfJoining: req.body.dateOfJoining,
        currentBooksIssued: req.body.currentBooksIssued,
        outstandingDebt: req.body.outstandingDebt,
        totalPaidTillDate: req.body.totalPaidTillDate,
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        throw err;
    })
});

membersRouter.route('/:id').get((req, res) => {
    Members.find({"member": req.params.id}).then((result) => {
        res.send(result);
    }).catch(err => {
        throw err;
    });
});

membersRouter.route('/:id').put((req, res) => {
    Members.updateOne({"memberID": req.params.id}, {
        contactNo: req.params.contactNo,
        currentBooksIssued: req.body.currentBooksIssued,
        outstandingDebt: req.body.outstandingDebt,
        totalPaidTillDate: req.body.totalPaidTillDate,
    }, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send({message: "Member with id: " + req.params.id + " updated Successfully"});
        }
    })
});

membersRouter.route('/:id').delete((req, res) => {
    Members.deleteOne({
        "memberID": req.params.id
    }).then((result) => {
        res.send({message: "Member with id: " + req.params.id + " deleted Successfully"});
    }).catch(err => {
        throw err;
    })
});

module.exports = membersRouter;