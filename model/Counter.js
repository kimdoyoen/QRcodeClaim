const mongoose = require('mongoose');
const { Schema } = mongoose;

const CounterSchema = new Schema({
    userNum: {
        type: Number,
        default: 0,
    },
    qrNum: {
        type: Number,
        default: 0,
    },
    claimNum: {
        type: Number,
        default: 0,
    }
});

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = { Counter };