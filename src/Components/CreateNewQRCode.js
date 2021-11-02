import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Select from "react-select";
import QRCode from 'react-qr-code';
import axios from 'axios';

function CreateNewQRCode(props) {
    const [CodeUrl, setCodeUrl] = useState("");
    const [QRLocation, setQRLocation] = useState("");
    const [QRType, setQRType] = useState("");
    const [EngineerIdx, setEngineerIdx] = useState(-1);
    const [EngineerList, setEngineerList] = useState([]);
    
    const options = [
        {value: "화장실", label: "화장실"},
        {value: "객차 안", label: "객차 안"},
        {value: "승강 설비", label: "승강 설비"},
    ];

    const SubmitHandler = (e) => {
        e.preventDefault();

        if(!QRType) {
            alert("민원 타입을 선택하세요.");
            return;
        }
        if(!QRLocation) {
            alert("부착 장소를 입력하세요.");
            return;
        }
        /*
        if(EngineerIdx === -1) {
            alert("담당 엔지니어를 선택하세요.");
            return;
        }
        */
        let body = {
            type: QRType,
            location: QRLocation,
            //engineer: EngineerList[EngineerIdx]._id,
        }

        axios.post("/api/qrcode/createQR", body).then((response) => {
            if(response.data.success) {
                setCodeUrl(response.data.url);
            }
        });
    }

    /*
    useEffect(() => {
        axios.post("/api/engineer/getEngineerList").then((response) => {
            if(response.data.success) {
                let temp = [...response.data.engineer];
                setEngineerList(temp);
                setOptions([]);
                let newOpt = [...Options];
                for(let i = 0; i<temp.length; i++) {
                    newOpt.push({value: i, label: temp[i].name});
                }
                setOptions(newOpt);
            }
        })
    }, []);

    useEffect(() => {
        console.log(Options);
    }, [Options])
    */

    return (
        <>
        {
            CodeUrl
            ? (
                <>
                <div>
                    <QRCode value={"http://localhost/submitClaim/"+CodeUrl} />
                </div>
                <button onClick={() => {props.history.push("/")}}>완료</button>
                </>
            ) : (
            <>
            <div>
                민원 타입
                <Select options={options} placeholder="민원 타입" onChange={(e) => setQRType(e.value)} />
            </div>
            <div>
                부착 장소:
                <input value={QRLocation} onChange={(e)=> setQRLocation(e.currentTarget.value)} />
            </div>
            {/*
                <div>
                    담당 엔지니어
                    <Select options={Options} placeholder="담당 엔지니어" onChange={(e) => setEngineerIdx(e.value)} />
                </div>
            {
                EngineerIdx > -1 && (
                    <div>
                        선택한 엔지니어
                        <div style={{border: "1px solid black"}}>
                            <p>이름: {EngineerList[EngineerIdx].name}</p>
                            <p>연락처: {EngineerList[EngineerIdx].phoneNum}</p>
                        </div>
                    </div>
                )
            }
        */}
            <button onClick={() => {props.history.push("/")}}>취소</button>
            <button onClick={(e) => {SubmitHandler(e)}}>QR code 생성하기</button>
            </>
            )
        }
        </>
    )
}

export default withRouter(CreateNewQRCode);
