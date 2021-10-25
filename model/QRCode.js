const mongoose = require('mongoose');
const { Schema } = mongoose;

const QRCodeSchema = new Schema({
    location: {
        type: String,
    },
    type: {
        type: String,
    },
    url: {
        type: Number,
        unique: true,
    }
});

const QRCode = mongoose.model('QRCode', QRCodeSchema);

module.exports = { QRCode };