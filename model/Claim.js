const mongoose = require('mongoose');
const { Schema } = mongoose;

var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

function realTime() {
    return moment().format("YY-MM-DD[ ]HH:mm");
  }

const ClaimSchema = new Schema({
    claimNum: {
        type: String,
    },
    location: {
        type: String,
    },
    type: {
        type: String,
    },
    claimArr: {
        type: Array,
    },
    etcContent: {
        type: String,
    },
    processingStatus: {
        type: String,
        default: "미처리"
    },
    processingContent: {
      type: String,
    },
    realTime: {
      type: String,
      default: realTime(),
    },
  },
  {
    timestamps: true,
    collection: "claim",
  });

const Claim = mongoose.model('Claim', ClaimSchema);

module.exports = { Claim };