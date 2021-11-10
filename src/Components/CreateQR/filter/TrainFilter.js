import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function TrainFilter(props) {
    const [TrainNum, setTrainNum] = useState(0);
    const [CoachNum, setCoachNum] = useState(0);
    const [location, setlocation] = useState("");

    const options = [
        {value: "앞", label: "앞"},
        {value: "중간", label: "중간"},
        {value: "뒤", label: "뒤"},
    ];

    const coachOptions = [
        {value: 1, label: 1},
        {value: 2, label: 2},
        {value: 3, label: 3},
        {value: 4, label: 4},
        {value: 5, label: 5},
        {value: 6, label: 6},
        {value: 7, label: 7},
        {value: 8, label: 8},
        {value: 9, label: 9},
        {value: 10, label: 10},
    ];

    const SelectStyles = {
        container: (provide) => ({
            ...provide,
            display: "inline-block",
            width: "20%",
            marginRight: "10px",
        }),
        valueContainer: (provide) => ({
            ...provide,
        }),
        singleValue: (provide) => ({
            ...provide,
            fontSize: "15px"
        }),
    };

    useEffect(() => {
        props.setQRLocation(TrainNum+"-"+CoachNum+"-"+location);
    }, [TrainNum, CoachNum, location]);

    return (
        <>
        <p>객차 번호</p>
        <input type="number" max="9999" className="inputBox" value={TrainNum} onChange={(e) => { if(e.currentTarget.value.length <= 4 && e.currentTarget.value >= 0) setTrainNum(e.currentTarget.value)}}/>
        <p>객실 번호</p>
        <Select options={coachOptions}  styles={SelectStyles} onChange={(e) => setCoachNum(e.value)} />
        <p>위치</p>
        <Select options={options}  styles={SelectStyles} onChange={(e) => setlocation(e.value)} />
        </>
    )
}

export default TrainFilter