import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import * as rdrLocales from 'react-date-range/dist/locale';
import axios from 'axios';

import { ClaimListDiv } from '../ManageClientCSS.js';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; 

function ClaimList() {
    const [ClaimList, setClaimList] = useState([]);
    const [Filter, setFilter] = useState("");
    const [Category, setCategory] = useState("전체");
    const [DateFilter, setDateFilter] = useState("전체");
    const [DateRangeFilter, setDateRangeFilter] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection",   
        }
    ]);

    const options= [
        { value: "전체", label: "전체"},
        { value: "날짜 및 카테고리", label: "날짜 및 카테고리"},
    ];

    const DateOptions= [
        { value: "전체", label: "전체"},
        { value: "날짜 선택", label: "날짜 선택"},
    ];

    const CategoryOptions= [
        { value: "전체", label: "전체"},
        { value: "화장실", label: "화장실"},
        { value: "객차 안", label: "객차 안"},
        { value: "승강 설비", label: "승강 설비"},
    ];

    const SelectStyles = {
        container: (provide) => ({
            ...provide,
            display: "inline-block",
            width: "15%",
            marginRight: "20px",
        })
    };

    const SelectHandler = (e) => {
        if(e.value === "전체") {
            setDateFilter("전체");
            setCategory("전체");
            setDateRangeFilter([{
                startDate: new Date(),
                endDate: new Date(),
                key: "selection",   
            }])
        }
        setFilter(e.value);
    }

    useEffect(() => {
        if(Filter === "전체" || DateFilter === "전체" || DateFilter === "선택 완료") {
            let body = {
                type: Category,
            };
            if(body.type==="전체" || Filter==="전체") {
                delete body.type;
            }
            if(DateFilter === "선택 완료") {
                let endDate = new Date(DateRangeFilter[0].endDate);
                endDate.setDate(endDate.getDate() + 1);
                body.createdAt = {
                    $gte: DateRangeFilter[0].startDate.getTime(),
                    $lte: endDate.getTime(),
                }
            }
            axios.post("/api/claim", body).then((response) => {
                if(response.data.success) {
                    let temp = [...response.data.claims];
                    setClaimList(temp);
                }
                else {
                    console.log(response.data.err);
                }
            })
        }
    }, [Filter, Category, DateFilter]);

    return (
        <ClaimListDiv>
            <div className="filter">
                <Select options={options} defaultValue={options[0]} styles={SelectStyles} onChange={(e) => { SelectHandler(e) }} />
                {
                    Filter === "날짜 및 카테고리" && (
                    <>
                    <Select options={DateOptions} defaultValue={DateOptions[0]} styles={SelectStyles} onChange={(e) => { setDateFilter(e.value) }} />
                    {
                        DateFilter === "선택 완료" && (
                            <>
                            <div className="date" onClick={() => setDateFilter("날짜 선택")}>{DateRangeFilter[0].startDate.toLocaleDateString()}</div>
                            <span>~</span>
                            <div className="date" onClick={() => setDateFilter("날짜 선택")}>{DateRangeFilter[0].endDate.toLocaleDateString()}</div>
                            </>
                        )
                    }
                    <Select options={CategoryOptions} defaultValue={CategoryOptions[0]} styles={SelectStyles} onChange={(e) => { setCategory(e.value) }} />
                    </>
                )}
                {
                    DateFilter === "날짜 선택" &&
                    <div className="datepicker">
                        <div className="calendar">
                            <DateRange
                                onChange={item => setDateRangeFilter([item.selection])}
                                moveRangeOnFirstSelection={false}
                                maxDate={new Date()}
                                locale={rdrLocales.ko}
                                ranges={DateRangeFilter}
                            />
                            <button className="submitBtn" onClick={() => setDateFilter("선택 완료")}>✖</button>
                        </div>
                    </div>
                }
            </div>
            <div className="listHead">
                <p>접수 시간</p>
                <p>접수 번호</p>
                <p>접수 위치</p>
                <p>카테고리</p>
                <p>처리 상태</p>
                <p>접수하기</p>
            </div>
            {
                ClaimList[0] && (
                    ClaimList.map((claim, idx) => {
                        let processingType = "";
                        if(claim.processingStatus==="미접수") {
                            processingType="before";
                        } else if (claim.processingStatus ==="접수 중") {
                            processingType="doing";
                        } else if (claim.processingStatus === "조치 완료") {
                            processingType="done";
                        } else {
                            processingType="hold";
                        }
                        return (
                            <div key={idx} className="claim">
                                <p>{claim.realTime}</p>
                                <p>{claim.claimNum}</p>
                                <p>{claim.location}</p>
                                <p>{claim.type}</p>
                                <p className={processingType}>{claim.processingStatus}</p>
                                <Link to={"/ClaimDetail/"+claim.claimNum}>
                                    <button>
                                        {claim.processingStatus === "조치 완료" ? "보기" : "접수"}
                                    </button>
                                </Link>
                            </div>
                        )
                    })
                )
            }
        </ClaimListDiv>
    )
}

export default ClaimList
