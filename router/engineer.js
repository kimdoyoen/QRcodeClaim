const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

const { User } = require("../model/User.js");


router.post("/user", (req, res) => {
    const user = new User(req.body)
    user.save((error) => {
        console.log(error);
        res.status(200).send({success: true, url: user.id})
    });
});

router.post("/idcheck", (req, res) => {
    User.findOne({ userID : req.body.userID }, (err, user) => {
        if(!user) {
            return res.json({
                success: true,
                message: "해당하는 ID가 존재하지 않습니다."
            });
        }
        else {
            return res.json({
                success: false,
                message: "해당하는 ID가 존재합니다."
            });
        }
    });
})


module.exports = router;

