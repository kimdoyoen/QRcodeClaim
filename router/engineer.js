const express = require("express");
const router = express.Router();

const { Engineer } = require("../model/Engineer.js");
const { Counter } = require("../model/Counter.js");

router.post("/register", (req, res) => {
    let temp = req.body;

    Counter.findOneAndUpdate({ _id: "61641e307e55a3e8110d1f30" }, { $inc: { userNum: 1 }})
    .exec()
    .then((counter) => {
        temp.userNum = counter.userNum;
        const engineer = new Engineer(temp);
        engineer.save()
        .then(() => {
            return res.status(200).send({success: true});
        });
    })
    .catch((err) => {
        return res.status(400).send({success: false});
    })
});

router.post("/getEngineerList", (req, res) => {
    Engineer.find({})
    .exec()
    .then((engineer) => {
        return res.status(200).send({success: true, engineer: engineer});
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).send({success: false, err});
    });
});

module.exports = router;