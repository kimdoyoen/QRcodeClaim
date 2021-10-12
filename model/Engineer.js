const mongoose = require('mongoose');
const { Schema } = mongoose;

const EngineerSchema = new Schema({
    userNum: {
        type: Number,
    },
    name: {
        type: String,
    },
    phoneNum: {
        type: String,
    },
});

const Engineer = mongoose.model('Engineer', EngineerSchema);

module.exports = { Engineer };