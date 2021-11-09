import React, { useState, useEffect } from 'react';

import Toilet from "./content/Toilet.js";
import Train from "./content/Train.js";
import Elevator from "./content/Elevator.js";
import SubmitComplete from './content/SubmitComplete.js';

import { CheckModalDiv } from "./ClaimSubmitCSS.js";

import axios from 'axios';

function SubmitClaim(props) {
    const [Code, setCode] = useState("");
    const [ClaimArr, setClaimArr] = useState([]);
    const [EtcContent, setEtcContent] = useState("");
    const [CheckContent, setCheckContent] = useState(false);
    const [Url, setUrl] = useState("");

    const setType = (type) => {
        // eslint-disable-next-line default-case
        switch(type) {
            case "화장실":
                return <Toilet ClaimArr={ClaimArr} setClaimArr={setClaimArr} EtcContent={EtcContent} setEtcContent={setEtcContent} setCheckContent={setCheckContent}/>
            case "객차 안":
                return <Train ClaimArr={ClaimArr} setClaimArr={setClaimArr} EtcContent={EtcContent} setEtcContent={setEtcContent} setCheckContent={setCheckContent} />
            case "승강 설비":
                return <Elevator ClaimArr={ClaimArr} setClaimArr={setClaimArr} EtcContent={EtcContent} setEtcContent={setEtcContent} setCheckContent={setCheckContent} />
            case "접수 완료":
                return <SubmitComplete url={Url}/>
        }
    }

    const SubmitHandler = (e) => {
        e.preventDefault();

        if(!ClaimArr[0]) {
            alert("민원 종류를 선택해주세요.");
            return;
        }

        setCheckContent(false);
        
        let body = {
            location: Code.location,
            type: Code.type,
            claimArr: ClaimArr,
            etcContent: EtcContent,
        }

        axios.post("/api/claim/claimSubmit", body).then((response) => {
            if(response.data.success) {
                setUrl(response.data.url);
                setCode({type: "접수 완료"});
            } else {
                alert(response.data.err);
            }
        })
    }

    useEffect(() => {
        let body = {
            url: props.match.params.url,
        };

        axios.post("/api/qrcode/getCode", body).then((response) => {
            if(response.data.success) {
                setCode(response.data.code);
            }
        });
    }, [props.match.params.url]);

    return (
        <div style={{margin:"0px", width:"100%", height: "100%"}}>
            {setType(Code.type)}
            {
                CheckContent && (
                    <CheckModalDiv>
                        <div className="container">
                            <p className="title">&lt; 접수 내용 확인 &gt;</p>
                            <div>
                                <p>접수 시간 : {new Date().toLocaleDateString()+" "+new Date().getHours().toLocaleString()+":"+new Date().getMinutes().toLocaleString()}</p>
                                <p>접수 위치 : {Code.type + " ("+Code.location+")"}</p>
                                <p>접수 내용</p>
                                <div>
                                    {
                                        ClaimArr.map((claim, idx) => {
                                            if(claim==="기타") {
                                                return null;
                                            }
                                            return <p key={idx}>{claim}</p>
                                        })
                                    }
                                    { EtcContent && <p style={{whiteSpace: "pre"}}>{EtcContent}</p> }

                                </div>
                                <div className="btnDiv">
                                    <button onClick={() => setCheckContent(false)}>취소</button>
                                    <button onClick={SubmitHandler}>확인</button>
                                </div>
                            </div>
                        </div>"
                    </CheckModalDiv>
                )
            }
        </div>
    )
}

export default SubmitClaim
