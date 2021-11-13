import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ClaimResultDiv } from "./ClaimSubmitCSS.js";

function ClaimResultCheck(props) {
    const [ClaimResult, setClaimResult] = useState({});

    useEffect(() => {
        console.log(props);
        let body = {
            claimNum: props.match.params.url,
        }

        axios.post("/api/claim/getClaimInfo", body).then((response) => {
            if(response.data.success) {
                setClaimResult({...response.data.claim});
            }
        })
    }, []);

    useEffect(() => {
        console.log(ClaimResult);
    }, [ClaimResult]);

    return (
        <ClaimResultDiv>
            <p className="label">접수 시간</p>
            <p>{ClaimResult.realTime}</p>
            <p className="label">접수 코드</p>
            <p>{ClaimResult.claimNum}</p>
            <p className="label">접수 위치</p>
            <p>{ClaimResult.location}</p>
            <p className="label">카테고리</p>
            <p>{ClaimResult.type}</p>
            <p className="label">처리 상태</p>
            <p>{ClaimResult.processingStatus}</p>
            <p className="label">처리 시간</p>
            <p>{ClaimResult.realTime}</p>
            
        </ClaimResultDiv>
    )
}

export default ClaimResultCheck
