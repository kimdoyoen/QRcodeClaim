import React, { useState, useEffect } from 'react';
import Toilet from "./content/Toilet.js";
import SubmitComplete from './content/SubmitComplete.js';

import axios from 'axios';

function SubmitClaim(props) {
    const [Code, setCode] = useState("");
    const [ClaimArr, setClaimArr] = useState([]);
    const [EtcContent, setEtcContent] = useState("");

    const setType = (type) => {
        // eslint-disable-next-line default-case
        switch(type) {
            case "화장실":
                return (
                <>
                <Toilet ClaimArr={ClaimArr} setClaimArr={setClaimArr} EtcContent={EtcContent} setEtcContent={setEtcContent} SubmitHandler={SubmitHandler}/>
                </>
                );
            
            case "객차 안":
                return (
                    <>
                    </>
                );

            case "승강 설비":
                return (
                    <>
                    </>
                );

            case "접수 완료":
                return (
                    <SubmitComplete />
                )
            
        }
    }

    const SubmitHandler = (e) => {
        e.preventDefault();

        if(!ClaimArr[0]) {
            alert("민원 종류를 선택해주세요.");
            return;
        }

        let body = {
            type: Code.type,
            location: Code.location,
            claimArr: ClaimArr,
            etcContent: EtcContent,
        }

        axios.post("/api/claim/claimSubmit", body).then((response) => {
            if(response.data.success) {
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
        </div>
    )
}

export default SubmitClaim
