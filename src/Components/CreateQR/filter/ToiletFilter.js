import React, { useState, useEffect} from 'react';
import Select from 'react-select';

function ToiletFilter(props) {
    const [Floor, setFloor] = useState(0);
    const [UnderFlag, setUnderFlag] = useState("");
    const [SlotNum, setSlotNum] = useState(0);
    const [Kind, setKind] = useState("");

    const options = [
        {value: "남자 화장실", label: "남자 화장실"},
        {value: "여자 화장실", label: "여자 화장실"},
        {value: "남자 장애인 화장실", label: "남자 장애인 화장실"},
        {value: "여자 장애인 화장실", label: "여자 장애인 화장실"},
    ];

    const SelectStyles = {
        container: (provide) => ({
            ...provide,
            display: "inline-block",
            width: "40%",
            marginRight: "30px",
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
        props.setQRLocation(UnderFlag + Floor + "-" + Kind + "-" + SlotNum);
    }, [Floor, UnderFlag, SlotNum, Kind]);

    return (
        <>
        <div style={{width: "100%", marginBottom: "10px"}}>
            <p>화장실 층</p>
            <input type="number" className="inputBox" value={Floor} onChange={(e) => { if(e.currentTarget.value >= 0) setFloor(e.currentTarget.value)}}/>
            <label style={{ marginRight: "2rem"}}>
                <input type="checkbox" value="지하" onClick={(e) => { if(e.target.checked) setUnderFlag("B"); else setUnderFlag(""); }} />
                지하
            </label>
        </div>
        <p>종류</p>
        <Select options={options}  styles={SelectStyles} placeholder="종류 선택" onChange={(e) => setKind(e.value)} />
        <p>화장실 칸 번호</p>
        <input type="number" className="inputBox" value={SlotNum} onChange={(e) => { if(e.currentTarget.value >= 0) setSlotNum(e.currentTarget.value)}}/>
        </>
    )
}

export default ToiletFilter
