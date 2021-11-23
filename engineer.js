const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

const { User } = require("../model/User.js");


router.post("/user", (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    user.save((error) => {
        console.log(error);
        res.status(200).send({success: true, url: user.id})
    });
});


module.exports = router;

