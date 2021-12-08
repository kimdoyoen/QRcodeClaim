import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ClaimResultDiv } from "./ClaimSubmitCSS.js";

function ClaimResultCheck(props) {
    const [ClaimResult, setClaimResult] = useState({});

    useEffect(() => {
        let body = {
            claimNum: props.match.params.url,
        }

        axios.post("/api/claim/getClaimInfo", body).then((response) => {
            if(response.data.success) {
                setClaimResult({...response.data.claim});
            }
        })
    }, []);

    return (
        <ClaimResultDiv>
            <div className="result">
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
                <p>{ClaimResult.processingStatus === "처리 완료" && moment(ClaimResult.updatedAt).format('YY-MM-DD[ ]HH:mm')}</p>
            </div>
            <CopyToClipboard text={"http://localhost:3000/ClaimResultCheck/"+props.match.params.url}>
                <button onClick={() => alert("복사 완료")}>링크 복사</button>
            </CopyToClipboard>
        </ClaimResultDiv>
    )
}

export default ClaimResultCheck
