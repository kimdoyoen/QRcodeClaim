import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { DateRange } from 'react-date-range';
import * as rdrLocales from 'react-date-range/dist/locale';
import moment from 'moment';
import axios from 'axios';

import Chart from './Chart';
import { ClaimChartDiv, FilterDiv } from "../ManageClientCSS.js";

function ClaimChart() {
    const [Data, setData] = useState([]);
    const [Percentage, setPercentage] = useState([]);
    const [Filter, setFilter] = useState("");
    const [Category, setCategory] = useState("전체");
    const [DateFilter, setDateFilter] = useState("전체");
    const [DateRangeFilter, setDateRangeFilter] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",   
        }
    ]);

    const options= [
        { value: "전체", label: "전체"},
        { value: "검색하기", label: "검색하기"},
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
                match: {
                    type: Category,
                },
                type: "$claimArr",
            };
            if(body['match'].type==="전체" || Filter==="전체") {
                delete body.match.type;
                body.type = "$type";
            }
            if(DateFilter === "선택 완료") {
                let endDate = new Date(DateRangeFilter[0].endDate);
                endDate.setDate(endDate.getDate() + 1);
                body['match'].createdAt = {
                    $gte: DateRangeFilter[0].startDate,
                    $lt: endDate
                }
            } else {
                body['match'].createdAt = {
                    $gte : 0,
                }
            }
            axios.post("/api/claim/getStatistics", body).then((response) => {
                if(response.data.success) {
                    let temp = [...response.data.pureData];
                    setData(temp);
                    temp = [...response.data.percentage];
                    setPercentage(temp);
                }
            })
        }
    }, [Filter, Category, DateFilter]);

    return (
        <ClaimChartDiv>
            <FilterDiv>
                <Select options={options} defaultValue={options[0]} styles={SelectStyles} onChange={(e) => { SelectHandler(e) }} />
                {
                    Filter === "검색하기" && (
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
            </FilterDiv>
            <div className="chart">
                <Chart Data={Data} Percentage={Percentage}/>
            </div>
        </ClaimChartDiv>
    )
}

export default ClaimChart
