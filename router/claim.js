const express = require("express");
const router = express.Router();

const { Counter } = require("../model/Counter.js");
const { Claim } = require("../model/Claim.js");

var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

router.post("/", (req, res) => {

    Claim.find(req.body)
    .sort({createdAt: -1})
    .exec()
    .then((claims) => {
        return res.status(200).send({success: true, claims: claims});
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).send({success: false, err});
    });
});

router.post("/claimSubmit", (req, res) => {
    let temp = req.body;
    if (temp.type === "화장실") {
        temp.claimNum = "T";
    } else if (temp.type === "객차 안") {
        temp.claimNum = "C";
    } else {
        temp.claimNum = "E";
    }

    Counter.findOneAndUpdate({ _id: "61641e307e55a3e8110d1f30" }, { $inc: { claimNum: 1 }})
    .exec()
    .then((counter) => {
        temp.claimNum = temp.claimNum + counter.claimNum;
        temp.realTime = moment().format("YY-MM-DD[ ]HH:mm");
        const claim = new Claim(temp);
        claim.save(() => {
            req.io.sockets.emit('new', claim);
            return res.status(200).send({success: true, url: claim.claimNum});
        })
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).send({success: false, err});
    });
});

router.post("/getClaimInfo", (req, res) => {
    Claim.findOne({claimNum: req.body.claimNum})
    .exec()
    .then((claim) => {
        return res.status(200).send({success: true, claim: claim});
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).send({success: false, err});
    });
});

router.post("/saveProcessing", (req, res) => {
    Claim.findOneAndUpdate(
        {claimNum: req.body.claimNum},
        {
            processingStatus: req.body.processingStatus,
            processingContent: req.body.processingContent
        })
        .exec()
        .then((response) => {
            return res.status(200).send({success: true});
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).send({success: false, err});
        });
})


module.exports = router;