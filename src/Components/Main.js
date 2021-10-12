import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Main() {
    const [QRList, setQRList] = useState([]);

    useEffect(() => {
        axios.post("/api/qrcode/").then((response) => {
            if(response.data.success) {
                let temp = [...response.data.qrcode];
                setQRList(temp);
                console.log(temp);
            }
        });
    }, []);

    return (
        <>
        <Link to="/makeNewQR" style={{marginBottom: "50px"}}>
        <button>QR code 생성하기</button>
        </Link>
        <Link to="/registerEngineer" >
        <button>설비 담당자 등록하기</button>
        </Link>
        <Link to="/EngineerList" >
        <button>설비 담당자 목록</button>
        </Link>
        {
            QRList.length > 0 && (
                <div>
                    QR code 목록
                    {
                        QRList.map((qr, idx) => {
                            return (
                                <div key={idx} style={{borderBottom: "1px solid black"}}>
                                    <p>위치: {qr.location}</p>
                                    <div>설비 담당자: 
                                        {
                                            qr.engineer.map((eng, idx) => {
                                                return (
                                                    <div key={idx} style={{background: "skyblue", marginBottom: "10px"}}>
                                                        <p>이름: {eng.name}</p>
                                                        <p>연락처: {eng.phoneNum}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        </>
    )
}

export default Main
