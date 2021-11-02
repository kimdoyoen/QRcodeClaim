const express = require("express");
const router = express.Router();

const { QRCode } = require("../model/QRCode.js");
const { Counter } = require("../model/Counter.js");

router.post("/", (req, res) => {
    QRCode.find({})
    .exec()
    .then((qrcodes) => {
        return res.status(200).send({success: true, qrcode: qrcodes});
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).send({success: false, err});
    })
});

router.post('/createQR', (req, res) => {
    let temp = req.body;

    Counter.findOneAndUpdate({ _id: "61641e307e55a3e8110d1f30" }, { $inc: { qrNum: 1 }})
    .exec()
    .then((counter) => {
        temp.url = counter.qrNum;
        const qr = new QRCode(temp);
        qr.save(() => {
            return res.status(200).send({success: true, url: temp.url});
        })
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).send({success: false, err});
    });
});

router.post("/getCode", (req, res) => {
    QRCode.findOne({url: req.body.url})
    .exec()
    .then((code) => {
        return res.status(200).send({success: true, code: code});
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).send({success: false, err});
    });
});

module.exports = router;