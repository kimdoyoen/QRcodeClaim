import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Select from "react-select";
import QRCode from 'react-qr-code';
import axios from 'axios';

function CreateNewQRCode(props) {
    const [CodeUrl, setCodeUrl] = useState("");
    const [QRLocation, setQRLocation] = useState("");
    const [EngineerIdx, setEngineerIdx] = useState(-1);
    const [EngineerList, setEngineerList] = useState([]);
    const [Options, setOptions] = useState([]);

    const SubmitHandler = () => {
        if(!QRLocation) {
            alert("부착 장소를 입력하세요.");
            return;
        }
        if(EngineerIdx === -1) {
            alert("담당 엔지니어를 선택하세요.");
            return;
        }
        let body = {
            location: QRLocation,
            engineer: EngineerList[EngineerIdx]._id,
        }

        axios.post("/api/qrcode/createQR", body).then((response) => {
            if(response.data.success) {
                setCodeUrl(response.data.url);
            }
        });
    }

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

    return (
        <>
        {
            CodeUrl
            ? (
                <>
                <div>
                    <QRCode value={"http://localhost/makeComplaints/"+CodeUrl} />
                </div>
                <button onClick={() => {props.history.push("/")}}>완료</button>
                </>
            ) : (
            <>
            <div>
                부착 장소:
                <input value={QRLocation} onChange={(e)=> setQRLocation(e.currentTarget.value)} />
            </div>
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
            <button onClick={() => {props.history.push("/")}}>취소</button>
            <button onClick={SubmitHandler}>QR code 생성하기</button>
            </>
            )
        }
        </>
    )
}

export default withRouter(CreateNewQRCode);
