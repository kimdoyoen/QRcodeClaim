import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Select from "react-select";
import QRCode from 'react-qr-code';
import axios from 'axios';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

import ToiletFilter from './filter/ToiletFilter.js';
import TrainFilter from './filter/TrainFilter.js';
import EVFilter from './filter/EVFilter.js';
import { ReactComponent as Triangle } from "./Triangle.svg";
import Save from "./save.svg";
import { CreateBody, CreateDiv, QRListDiv } from "./CreateQRCSS.js";

function CreateNewQRCode(props) {
    const [CodeIdx, setCodeIdx] = useState(-1);
    const [QRLocation, setQRLocation] = useState("");
    const [QRType, setQRType] = useState("");
    const [QRList, setQRList] = useState([]);
    const [EngineerIdx, setEngineerIdx] = useState(-1);
    const [EngineerList, setEngineerList] = useState([]);
    
    const options = [
        {value: "화장실", label: "화장실"},
        {value: "객차 안", label: "객차 안"},
        {value: "승강 설비", label: "승강 설비"},
    ];

    const SelectStyles = {
        container: (provide) => ({
            ...provide,
            display: "inline-block",
            width: "30%",
            marginRight: "30px",
        }),
        valueContainer: (provide) => ({
            ...provide,
            height: "3rem",
        }),
        singleValue: (provide) => ({
            ...provide,
            fontSize: "20px",
        }),
    };

    const setFilter = () => {
        switch (QRType) {
            case "화장실":
                return <ToiletFilter setQRLocation={setQRLocation} />;

            case "객차 안":
                return <TrainFilter setQRLocation={setQRLocation} />;

            case "승강 설비":
                return <EVFilter setQRLocation={setQRLocation} />;
        
            default:
                return null;
        }
    }

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

        if(QRType === "화장실") {
            let temp = QRLocation.split('-');

            if(temp[0] === "0" || (temp[0][0] === "B" && temp[0][1] === "0")) {
                alert("화장실 층을 올바르게 입력하세요.");
                return;
            }
            if(temp[1] === "0") {
                alert("화장실 번호를 입력하세요.");
                return;
            }
            if(!temp[2]) {
                alert("종류를 선택하세요.");
                return;
            }
        }

        if(QRType === "객차 안") {
            let temp = QRLocation.split('-');

            if(temp[0].length !== 4 || temp[0][0] === "0") {
                alert("객차 번호를 올바르게 입력하세요.");
                return;
            }
            if(temp[1] === "0") {
                alert("객실 번호를 선택하세요.");
                return;
            }
            if(!temp[2]) {
                alert("위치를 선택하세요.");
                return;
            }
        }

        if(QRType === "승강 설비") {
            let temp = QRLocation.split('-');

            if(!temp[0]) {
                alert("승강 설비 종류를 선택하세요.");
                return;
            }
            if(!temp[1]) {
                alert("승강 설비 위치를 입력하세요.");
                return;
            }
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

        axios.post("/api/qrcode/checkLocation", { location: QRLocation }).then((response) => {
            if(response.data.success) {
                if(!response.data.isDuplicate) {
                    axios.post("/api/qrcode/createQR", body).then((result) => {
                        if(result.data.success) {
                            window.reload();
                        }
                    });
                }
                else {
                    alert("이미 같은 위치에 생성된 QR code가 있습니다.");
                }
            }
            else {
                alert("다시 한번 시도해주십시오.");
            }
        })
    }

    const ImageSaveHandler = () => {
        console.log(QRLocation);
        domtoimage
        .toBlob(document.querySelector('.codeContainer'))
        .then((blob) => {
            saveAs(blob, `${QRList[CodeIdx].location}`);
        });
    }

    useEffect(() => {
        axios.get("/api/user/auth").then((response) => {
            if(response.data.isAuth) {
            } else {
                props.history.push("/login");
            }
        });
    }, []);

    useEffect(() => {
        
        axios.post("/api/qrcode").then((response) => {
            if(response.data.success) {
                let temp = [...response.data.qrcodes];
                setQRList(temp);
            }
        })
    }, []);

    return (
        <CreateBody>
            <CreateDiv>
            <div className="category">
                <Select options={options}  styles={SelectStyles} placeholder="카테고리 선택" onChange={(e) => { setQRType(e.value); setQRLocation(""); setCodeIdx(-1);}} />
                <button className="createBtn" onClick={(e) => {SubmitHandler(e)}}>코드 생성</button>
            </div>
            <div className="filter">
                {setFilter()}
            </div>
            {
                CodeIdx !== -1 && (
                    <>
                    <div className="codeContainer">
                        <div className="QR">
                            <QRCode value={"http://localhost/submitClaim/"+QRList[CodeIdx].url} size="200" />
                        </div>
                        <div className="desc">
                            <Triangle /> <br />
                            QR코드를 스캔하여 민원을 접수해보세요.<br />
                            전화・문자 접수 : 1577-1234
                        </div>
                    </div>
                    <img src={Save} style={{width:"2rem", float: "right", margin: "10px"}} onClick={ImageSaveHandler} />
                    </>
                )
            }
        </CreateDiv>
        <QRListDiv>
            <p>생성된 QR 코드 목록</p>
            <div className="qrList">
                {
                    QRList.map((qr, idx) => {
                        if(CodeIdx === idx)
                            return <p onClick={() => setCodeIdx(-1)} className="active">{qr.location}</p>
                        else return <p onClick={() => { setCodeIdx(idx); setQRType("");}}>{qr.location}</p>
                    })
                }
            </div>
        </QRListDiv>
        <div className="btnDiv">
            <button onClick={() => {props.history.push("/")}}>취소</button>
            <button onClick={() => {props.history.push("/")}} style={{marginLeft: "2rem"}}>완료</button>
        </div>
        </CreateBody>
    )
}

export default withRouter(CreateNewQRCode);
