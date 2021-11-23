const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

const { User } = require("../model/User.js");
const { auth } = require('../middleware/auth.js');

router.post("/login", (req, res) => {
    User.findOne({ userID : req.body.userID }, (err, user) => {
        if(!user) {
            return res.json({
                success: false,
                message: "해당하는 ID가 없습니다."
            });
        }

        if(user.pw != req.body.pw) {
            return res.json({
                success: false,
                message: "비밀번호가 일치하지 않습니다."
            });
        }
        user.generateToken((err, user) => {
            if(err){
                console.log(err);
                return res.status(400).send(err);
            }

            console.log(user.userID);
            res.cookie("x_auth", user.token)
                .status(200)
                .json({ success: true, userID: user.userID });
        });
    });
});

router.get("/auth", auth, function(req, res) {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        userID: req.user.userID,
        phone: req.user.phone,
        email: req.user.phone,
        type: req.user.type
    });
});

router.post("/logout", auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
        if(err) return res.json({ success: false, err });
        return res.status(200).json({success: true});
    });
});

module.exports = router;
