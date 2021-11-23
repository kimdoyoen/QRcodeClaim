const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    userID: {
        type: String,
        unique: true,
    },
    pw: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    type: {
        type: String,
    },
    token: {
        type: String,
    }
});


const jwt = require('jsonwebtoken');

UserSchema.methods.generateToken = function(cb) {
    let user = this;
    console.log(user);

    let token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    console.log(user);
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    });
}


UserSchema.statics.findByToken = function(token, cb) {
    let user = this;
    jwt.verify(token, 'secretToken', function(err, decoded) {
        if(err) return cb(err);
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        });
    });
};


const User = mongoose.model('User', UserSchema);


module.exports = { User };