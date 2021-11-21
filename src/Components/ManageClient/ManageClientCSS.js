/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const ManageBody = styled.div`
    width: 80%;
    height: 100vh;
    margin: 0 auto;
`;

const HeaderDiv = styled.div`
    margin-top: 30px;
    .category {
        margin-top: 10px;
        button {
            background: rgb(224, 224, 224);
            color: rgb(131, 131, 131);
            padding: 5px 10px;
            margin-right: 10px;
            border-radius: 15px;
            border: none;
            cursor: pointer;
        }
        .active {
            background: rgb(190, 190, 190);
            color: black;
            font-weight: bold;
        }
        a {
            float: right;
        }
    }
`;

const ClaimAlarmDiv = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0, 0.5);
    .container {
        position: absolute;
        top: 20%;
        left: 40%;

        height: 25%;
        width: 20%;

        background: #fff;
        border-radius: 4px;

        .close {
            padding-right: 15px;
            margin-top: 5px;
            font-size: 20px;
            border: none;
            background: none;
            cursor: pointer;
            float: right;
        }

        .content {
            margin-top: 3rem;
            text-align: center;
        }

        .check {
            width: 25%;
            margin: 1.5rem 37.5% 0 37.5%;
            padding: 3% 5%;
            background: rgb(168, 220, 255);
            border: none;
            border-radius: 2px;
        }
    }
`;

const ClaimListDiv = styled.div`
    margin: 10px 0;
    .filter {
        .date {
            display: inline-block;
            border: 1px solid hsl(0, 0%, 80%);
            padding: 7px 10px;
            border-radius: 3.5px;
            margin-right: 20px;
            cursor: pointer;
        }
        .date + span {
            margin-right: 20px;
        }
        .datepicker {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: rgb(0, 0, 0, 0.5);
            .calendar {
                position: absolute;
                top: 15%;
                left: 35%;

                .submitBtn {
                    position: relative;
                    top: -2rem;
                    left: 1rem;
                    background: none;
                    border: none;
                    font-size: 30px;
                    line-height: 30px;
                }
            }
        }
    }
    .listHead {
        background: rgb(168, 220, 255);
        margin-top: 1rem;
        padding: 0 auto;
        p {
            display: inline-block;
            width: calc(100% / 7);
            text-align: center;
        }
    }
    .claim {  
        p {
            display: inline-block;
            width: calc(100% / 7);
            text-align: center;
        }
        .before {
            color: rgb(231, 76, 60);
        }
        .doing, .hold {
            color: rgb(241, 196, 15);
        }
        .done {
            color: rgb(26, 188, 156);
        }
        a {
            width: 100%;
            button {
                cursor: pointer;
                background: rgb(224, 224, 224);
                padding: 5px 15px;
                border-radius: 4px;
                border: none;
            }
        }
    }
`;

const BackHeadDiv = styled.div`
    margin-top: 2rem;
    background: rgb(168, 220, 255);
    font-size: 20px;
    padding: 1rem 5%;
    p {
        margin: 0;
        font-weight: bold;
        cursor: pointer;
    }
`;

const ClaimInfoDiv = styled.div`
    display: inline-block;
    width: calc(40% - 1px);
    vertical-align: top;

    margin: 2rem 0;
    padding: 2% 5%;
    border-right: 1px solid black;

    .info {
        height: 20vh;
        font-size: 20px;
    }

    .content {
        height: 15rem;
        padding: 2.5%;
        border: 1px solid rgb(190, 190, 190);
        border-radius: 4px;
        p {
            font-size: normal;
        }
    }
`;

const ProcessingDiv = styled.div`
    display: inline-block;
    width: 40%;

    margin: 2rem 0;
    padding: 2% 5%;

    .status {
        height: 20vh;
        font-size: 20px;
    }
    .content {
        height: 15rem;
        padding: 2.5%;
        border: 1px solid rgb(190, 190, 190);
        border-radius: 4px;

        textarea {
            height: 100%;
            width: 100%;
            border: none;
            word-break: keep-all;
            resize: none;
            &:focus {
              outline: none;
            }
        }
        textarea:disabled {
            background: #fff;
        }
    }
`;

const SaveBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    button {
        background: rgb(168, 220, 255);
        padding: 5px 20px;
        font-size: 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
`;

const ClaimChartDiv = styled.div`
    height: 100vh;
    margin: 10px 0;
    .chart {
        margin-top: 2vh;
        height: 50vh;
    }
`;

const FilterDiv = styled.div`
    .date {
        display: inline-block;
        border: 1px solid hsl(0, 0%, 80%);
        padding: 7px 10px;
        border-radius: 3.5px;
        margin-right: 20px;
        cursor: pointer;
    }
    .date + span {
        margin-right: 20px;
    }
    .datepicker {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgb(0, 0, 0, 0.5);
        z-index: 1000;
        .calendar {
            position: absolute;
            top: 15%;
            left: 35%;

            .submitBtn {
                position: relative;
                top: -2rem;
                left: 1rem;
                background: none;
                border: none;
                font-size: 30px;
                line-height: 30px;
            }
        }
    }
`;
const ChartContainerDiv = styled.div`
    display: inline-block;
    height: 100%;
    width: 50%;
`;

export { ManageBody, HeaderDiv, ClaimAlarmDiv, ClaimListDiv, BackHeadDiv, ClaimInfoDiv, ProcessingDiv, SaveBtn, ChartContainerDiv, FilterDiv, ClaimChartDiv };
