/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const RegDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;

    width: 60%;
    height: 90vh;

    margin: 0 auto;

    tr:nth-of-type(3) {
        text-align: right;
        td {
            padding-top: 0px;
            button {
                background: rgb(168, 220, 255);
                padding: 5px 10px;
                border: none;
                font-size: 15px;
            }
        }
    }

    table {
        margin: 0 auto;
        font-size: 20px;
        tbody {
            tr {
                vertical-align: middle;
                height: 120%;
                td: nth-of-type(1) {
                    display: inline-block;
                    padding-right: 30px;
                    text-align: right;
                }
                td {
                    padding-top: 10px;
                    padding-bottom: 10px;
                    vertical-align: middle;
                    input {
                        display: inline-block;
                        height: 1.5rem;
                        margin: 0px;
                        border-radius: 4px;
                        border: 1px solid rgb(94, 94, 94);
                    }
                    div {
                        label {
                            margin-right: 20px;
                        }
                    }
                }
            }
        }
    }

    .btnDiv {
        display: flex;

        width: 20%;
        margin: 1rem auto;
        justify-content: space-evenly;

        button {
            padding: 1rem 2rem;
            background: rgb(224, 224, 224);
            border: none;
            border-radius: 4px;
            font-size: 20px;
            cursor: pointer;
        }
    }
`;

export { RegDiv };