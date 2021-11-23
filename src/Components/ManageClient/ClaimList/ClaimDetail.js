import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Select from "react-select";
import axios from "axios";

import { ManageBody, BackHeadDiv, ClaimInfoDiv, ProcessingDiv, SaveBtn } from '../ManageClientCSS';

function ClaimDetail(props) {
    const [ClaimInfo, setClaimInfo] = useState({});
    const [ChangeStatus, setChangeStatus] = useState("");
    const [ChangeContent, setChangeContent] = useState("");
    const [Options, setOptions] = useState([
        {value: "미처리", label: "미처리"},
        {value: "처리 중", label: "처리 중"},
        {value: "보류", label: "보류"},
        {value: "처리 완료", label: "처리 완료"},
    ]);

    const SelectStyles = {
        container: (provide) => ({
            ...provide,
            display: "inline-block",
            width: "40%",
            marginLeft: "20px",
        })
    };

    const SaveHandler = () => {
        let body = {
            claimNum: ClaimInfo.claimNum,
            processingStatus: ChangeStatus,
            processingContent: ChangeContent,
        };

        axios.post("/api/claim/saveProcessing", body).then((response) => {
            if(response.data.success) {
                alert("저장이 완료되었습니다.");
                props.history.push("/");
            } else {
                console.log(response.data.err);
            } 
        })
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
        let body = {
            claimNum: props.match.params.url,
        };

        axios.post("/api/claim/getClaimInfo", body).then((response) => {
            if(response.data.success) {
                setClaimInfo(response.data.claim);
                setChangeStatus(response.data.claim.processingStatus);
                setChangeContent(response.data.claim.processingContent);
            } else {
                console.log(response.data.err);
            }
        })
    }, [])

    useEffect(() => {
        if(ClaimInfo.processingStatus === "처리 중" || ClaimInfo.processingStatus === "보류") {
            let temp = [...Options];
            temp.shift();
            setOptions(temp);
        }
    }, [ClaimInfo])

    return (
        <ManageBody>
            <BackHeadDiv>
                <p className="back" onClick={() => {props.history.goBack()}}>&lt; 돌아가기</p>
            </BackHeadDiv>
            {
                ClaimInfo._id && (
                    <>
                    <ClaimInfoDiv>
                        <div className="info">
                            <p>접수 번호 : {ClaimInfo.claimNum}</p>
                            <p>카테고리 : {ClaimInfo.type}</p>
                            <p>민원 접수 내용</p>
                        </div>
                        <div className="content">
                            {
                                ClaimInfo.claimArr.map((claim, idx) => {
                                    return (
                                        <p key={idx}>{claim}</p>
                                    )
                                })
                            }
                            {
                                ClaimInfo.etcContent && <p>{ClaimInfo.etcContent}</p>
                            }
                        </div>
                    </ClaimInfoDiv>
                    <ProcessingDiv>
                        <div className="status">
                            <p>
                                처리 상태 : 
                                {
                                    ClaimInfo.processingStatus === "처리 완료"
                                    ? "처리 완료"
                                    : <Select
                                        options={Options}
                                        styles={SelectStyles}
                                        placeholder={ClaimInfo.processingStatus}
                                        onChange={(e) => setChangeStatus(e.value)}
                                        />
                                }
                            </p>
                            {
                                ( ChangeStatus==="보류" || ChangeStatus === "처리 완료" ) && <p>조치 내용</p>
                            }
                        </div>
                        {
                            (ChangeStatus==="보류" || ChangeStatus==="처리 완료") && (
                                <div className="content">
                                    <textarea
                                        placeholder="처리 내용을 입력해주세요."
                                        value={ChangeContent}
                                        disabled={ClaimInfo.processingStatus==="처리 완료" ? true : false}
                                        onChange={(e) => setChangeContent(e.target.value)}
                                    ></textarea>
                                </div>
                            )
                        }
                    </ProcessingDiv>
                    {
                        ClaimInfo.processingStatus !== "처리 완료" &&
                        <SaveBtn>
                            <button onClick={SaveHandler} >저장</button>
                        </SaveBtn>
                    }
                    </>
                )
            }
        </ManageBody>
    )
}

export default withRouter(ClaimDetail)
