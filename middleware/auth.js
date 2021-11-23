const { User } = require("../model/User.js");

let auth = function(req, res, next) {
    let token = req.cookies.x_auth;
    // console.log(token);

    if (!token) return res.json({ isAuth: false, error: true });

    User.findByToken(token, function(err, user) {
        if(err) return console.log(err);
        if(!user) return res.json({ isAuth: false, error: true});

        req.token = token;
        req.user = user;

        next();
    });
};

module.exports = { auth };