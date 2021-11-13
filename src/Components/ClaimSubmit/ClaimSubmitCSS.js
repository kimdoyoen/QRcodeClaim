/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const ClaimBody = styled.div`
    padding: 5%;
    h1 {
        font-size: 25px;
    }
    .desc {
        margin: 2rem 0;
        word-break: keep-all;
        &::before {
            content: "";

            position: fixed;
            top: 0px;
            left: 0px;

            width: 100vw;
            height: 100vh;

            background-image: url("/Img/logo.jpg");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;

            opacity: 0.2;
            z-index: -1;
        }
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
        resize: none;
        &:focus {
          outline: none;
        }
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
            margin-top: 3rem;
            button {
                padding: 0.5rem 1.5rem;
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
        z-index: 1;
        &::before {
            content: "";
            position: fixed;
            top: 0px;
            left: 0px;

            width: 100vw;
            height: 100vh;
            background-image: url("/Img/logo.jpg");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;

            opacity: 0.2;
            z-index: -50;
        }
    }
`;

const ClaimResultDiv = styled.div`
    display: grid;
    grid-auto-columns: 4fr 6fr;
    gird-row: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-auto-flow: row;

	align-items: stretch;
	justify-items: stretch;
    align-content: center;

    height: 100vh;

    p {
        margin: 0;
        padding: 1rem;
    }
    .label {
        background: rgb(169, 219, 253);
    }
    p:nth-child(2n) {
        grid-column: 2;
    }
`;

export { ClaimBody, CheckModalDiv, CompleteDiv, ClaimResultDiv };