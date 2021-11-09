/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const ClaimBody = styled.div`
    padding: 5%;
    h1 {
        font-size: 25px;
    }
    .checkbox {
        div {
            margin-bottom: 0.5rem;
        }
    }
    .content {
        width: 100%;
        border: 1px solid gray;
        border-radius: 4px;
        height: 12rem;
        word-break: keep-all;
    }
    .submitBtn {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        button {
            padding: 5px 1.5rem;
            background: rgb(168, 220, 255);
            border: none;
            border-radius: 4px;
        }
    }
`;

const CheckModalDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;

    position: fixed;
    top: 0px;
    left: 0px;

    width: 100vw;
    height: 100vh;

    background-color: rgba( 0, 0, 0, 0.5 );

    .container {
        position: absolute;

        width: 80vw;
        height: auto;
        max-height: 80vh;

        padding: 2rem 1rem;

        background-color: #fff;

        overflow: scroll;

        .title {
            position: relative;
            margin: 0px;
            font-size: 20px;
            text-align: center;
        }
        .btnDiv {
            display: flex;
            justify-content: space-evenly;
            align-content: center;
            align-items: center;
            button {
                padding: 5px 1.5rem;
                background: rgb(168, 220, 255);
                border: none;
                border-radius: 4px;
            }
        }
    }
`;

const CompleteDiv = styled.div`
    padding: 2rem;
    .title {
        font-size: 20px;
        text-align: center;
    }
    .content {
        margin-top: 2rem;
        line-height: 25px;
    }
`;

export { ClaimBody, CheckModalDiv, CompleteDiv };