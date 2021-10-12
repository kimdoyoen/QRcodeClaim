const mongoose = require('mongoose');
const { Schema } = mongoose;

const QRCodeSchema = new Schema({
    location: {
        type:String,
    },
    engineer: [{
        type: Schema.Types.ObjectId,
        ref: 'Engineer',
    }],
    url: {
        type: Number,
        unique: true,
    }
});

const QRCode = mongoose.model('QRCode', QRCodeSchema);

module.exports = { QRCode };