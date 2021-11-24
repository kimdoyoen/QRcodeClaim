const express = require("express");
const router = express.Router();

const { Counter } = require("../model/Counter.js");
const { Claim } = require("../model/Claim.js");

var moment = require("moment");
const { min } = require("date-fns");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

router.post("/", (req, res) => {
    Claim.find(req.body)
    .sort({createdAt: -1})
    .exec()
    .then((claims) => {
        return res.status(200).send({success: true, claims: claims});
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).send({success: false, err});
    });
});

router.post("/claimSubmit", (req, res) => {
    let temp = req.body;
    if (temp.type === "화장실") {
        temp.claimNum = "T";
    } else if (temp.type === "객차 안") {
        temp.claimNum = "C";
    } else {
        temp.claimNum = "E";
    }

    Counter.findOneAndUpdate({ _id: "618bcdc937fc4cb78c7293fe" }, { $inc: { claimNum: 1 }})
    .exec()
    .then((counter) => {
        temp.claimNum = temp.claimNum + counter.claimNum;
        temp.realTime = moment().format("YY-MM-DD[ ]HH:mm");
        const claim = new Claim(temp);
        claim.save(() => {
            req.io.sockets.emit('new', claim);
            return res.status(200).send({success: true, url: claim.claimNum});
        })
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).send({success: false, err});
    });
});

router.post("/getClaimInfo", (req, res) => {
    Claim.findOne({claimNum: req.body.claimNum})
    .populate("engineer")
    .exec()
    .then((claim) => {
        return res.status(200).send({success: true, claim: claim});
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).send({success: false, err});
    });
});

router.post("/saveProcessing", (req, res) => {
    Claim.findOneAndUpdate(
        {claimNum: req.body.claimNum},
        req.body)
        .exec()
        .then((response) => {
            return res.status(200).send({success: true});
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).send({success: false, err});
        });
});

const setTemp = (type) => {
    switch (type) {
        case "객차 안":
            return [
                [{type: "객차가 더러워요"}, {type: "너무 더워요"}, {type: "너무 추워요"}, {type: "피해를 주는 사람이 있어요(잡상인 등)"}, {type: "마스크 안 쓴 사람이 있어요"}, {type: "문이 고장났어요"}, {type: "기타"}],
            [
                {
                    id:"처리",
                    data: [{ x: "객차가 더러워요", y: 0 }, { x: "너무 더워요", y: 0 }, { x: "너무 추워요", y: 0 }, { x: "피해를 주는 사람이 있어요(잡상인 등)", y: 0 }, { x: "마스크 안 쓴 사람이 있어요", y: 0 }, { x: "문이 고장났어요", y: 0 }, { x: "기타", y: 0 }]
                },
                {
                    id:"미처리",
                    data: [{ x: "객차가 더러워요", y: 0 }, { x: "너무 더워요", y: 0 }, { x: "너무 추워요", y: 0 }, { x: "피해를 주는 사람이 있어요(잡상인 등)", y: 0 }, { x: "마스크 안 쓴 사람이 있어요", y: 0 }, { x: "문이 고장났어요", y: 0 }, { x: "기타", y: 0 }]
                }
            ]];
        
        case "승강 설비":
            return [
                [{type: "에스컬레이터가 멈췄어요/고장났어요"}, {type: "엘리베이터가 멈췄어요/고장났어요"}, {type: "기타"}],
            [
                {
                    id:"처리",
                    data: [{ x: "에스컬레이터가 멈췄어요/고장났어요", y: 0 }, { x: "엘리베이터가 멈췄어요/고장났어요", y: 0 }, { x: "기타", y: 0 }]
                },
                {
                    id:"미처리",
                    data: [{ x: "에스컬레이터가 멈췄어요/고장났어요", y: 0 }, { x: "엘리베이터가 멈췄어요/고장났어요", y: 0 }, { x: "기타", y: 0 }]
                }
            ]];
        
        case "화장실":
            return [
                [{type: "화장실이 더러워요"}, {type: "화장지가 없어요"}, {type: "변기가 고장났어요"}, {type: "휴지통이 다 찼어요"}, {type: "전등이 고장났어요"}, {type: "비누/세정제가 다 떨어졌어요"}, {type: "기타"}],
            [
                {
                    id:"처리",
                    data: [{ x: "화장실이 더러워요", y: 0 }, { x: "화장지가 없어요", y: 0 }, { x: "변기가 고장났어요", y: 0 }, { x: "휴지통이 다 찼어요", y: 0 }, { x: "전등이 고장났어요", y: 0 }, { x: "비누/세정제가 다 떨어졌어요", y: 0 }, { x: "기타", y: 0 }]
                },
                {
                    id:"미처리",
                    data: [{ x: "화장실이 더러워요", y: 0 }, { x: "화장지가 없어요", y: 0 }, { x: "변기가 고장났어요", y: 0 }, { x: "휴지통이 다 찼어요", y: 0 }, { x: "전등이 고장났어요", y: 0 }, { x: "비누/세정제가 다 떨어졌어요", y: 0 }, { x: "기타", y: 0 }]
                }
            ]];
            
        default:
            return [
                [{type: "객차 안"}, {type: "승강 설비"}, {type: "화장실"}],
            [
                {
                    id:"처리",
                    data: [{ x: "객차 안", y: 0 }, { x: "승강 설비", y: 0 }, { x: "화장실", y: 0 }]
                },
                {
                    id:"미처리",
                    data: [{ x: "객차 안", y: 0 }, { x: "승강 설비", y: 0 }, { x: "화장실", y: 0 }]
                }
            ]];
    }
}
router.post("/getStatistics", (req, res) => {
    if(req.body.match.createdAt.$lt !== undefined) {
        req.body.match.createdAt.$lt = new Date(req.body.match.createdAt.$lt);
    }
    req.body.match.createdAt.$gte = new Date(req.body.match.createdAt.$gte);
    Claim.aggregate([
        {
            $match: req.body.match,
        },
        {
            $unwind: '$claimArr'
        },
        {
            $group: {
                _id: {
                    type: req.body.type,
                    processingStatus: '$processingStatus',
                },
                sum: {"$sum": 1},
            }
        },
        {
            $group: {
                _id: {
                    type: '$_id.type',
                },
                processingStatus: {
                    $addToSet: {
                        "k":'$_id.processingStatus',
                        "v": "$sum"
                    }
                },
                sum: {"$sum": "$sum"},
            }
        },
        {
            $project : {
                _id: 0,
                type: '$_id.type',
                sum: '$sum',
                "processingStatus": {
                    "$arrayToObject" : "$processingStatus"
                }
            }
        },
        {
            $sort: {
                type: 1,
            },
        },
        // {
        //     $group: {
        //         _id: {
        //             type: '$type',
        //             claim: "$claimArr",
        //             processingStatus: '$processingStatus',
        //         },
        //         sum: {"$sum": 1},
        //     }
        // },
        // {
        //     $group: {
        //         _id: {
        //             type: '$_id.type',
        //             claim: '$_id.claim'
        //         },
        //         processingStatus: {
        //             $addToSet: {
        //                 "k":'$_id.processingStatus',
        //                 "v": '$sum',
        //             }
        //         },
        //         sum: {"$sum": "$sum"},
        //     }
        // },
        // {
        //     $group: {
        //         _id: {
        //             type: '$_id.type',
        //         },
        //         claim: {
        //             $addToSet: {
        //                 "k":'$_id.claim',
        //                 "v": { "$arrayToObject" : "$processingStatus" }
        //             }
        //         },
        //         sum: {"$sum": "$sum"},
        //     }
        // },
        // {
        //     $project : {
        //         _id: 0,
        //         type: '$_id.type',
        //         sum: '$sum',
        //         "claim": {
        //             "$arrayToObject" : "$claim"
        //         }
        //     }
        // }
    ])
    .exec()
    .then((result) => {
        let [temp, temp2] = setTemp(req.body.match ? req.body.match.type : "");
        let idx = 0;
        for(let i=0; i<temp.length && result.length>0; i++) {
            let newItem = {...result[idx].processingStatus};
            newItem.type = result[idx].type;
            let percentage1 = {
                x: result[idx].type,
                y: isNaN((result[idx].processingStatus["처리 완료"] / result[idx].sum)*100) ? 0 : (result[idx].processingStatus["처리 완료"] / result[idx].sum)*100,
            };
            let percentage2 = {
                x: result[idx].type,
                y: isNaN((result[idx].processingStatus["미처리"] / result[idx].sum)*100) ? 0 : (result[idx].processingStatus["미처리"] / result[idx].sum)*100,
            }
            if(temp[i].type === result[idx].type) {
                temp[i] = newItem;
                temp2[0]['data'][i] = percentage1;
                temp2[1]['data'][i] = percentage2;
                idx++;
            }
            if(idx === result.length) break;
        }
        return res.status(200).send({success: true, pureData: temp, percentage: temp2});
    })
    .catch((err) => {
        console.log(err);
        return res.status(400).send({success: false, err});
    });
})

module.exports = router;