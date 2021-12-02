import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function EVFilter(props) {
    const [Station, setStation] = useState("");
    const [Kind, setKind] = useState("");
    const [Location, setLocation] = useState("");

    const options = [
        {value: "E/V", label: "E/V"},
        {value: "E/S", label: "E/S"},
    ];

    const KindOptions = [
        {value: "승강장", label: "승강장"},
        {value: "대합실", label: "대합실"},
        {value: "외부", label: "외부"},
    ];

    const SelectStyles = {
        container: (provide) => ({
            ...provide,
            display: "inline-block",
            width: "30%",
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
        props.setQRLocation(Station+"_"+Kind+"_"+Location);
    }, [Station, Kind, Location])

    return (
        <>
        <p>역사 코드</p>
        <input type="text" className="inputBox" value={Station} onChange={(e) => setStation(e.currentTarget.value)}/>
        <p>종류</p>
        <Select options={options}  styles={SelectStyles} onChange={(e) => { setKind(e.value); setLocation(""); }} />
        <p>번호</p>
        {
            Kind === "E/V"
            ? <Select options={KindOptions}  styles={SelectStyles} onChange={(e) => setLocation(e.value)} />
            : <input type="number" className="inputBox" value={Location} onChange={(e) => { if(e.currentTarget.value >= 0) setLocation(e.currentTarget.value)}}/>
        }
        </>
    )
}

export default EVFilter
