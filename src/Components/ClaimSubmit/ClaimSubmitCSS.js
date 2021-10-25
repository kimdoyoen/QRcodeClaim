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
        border-radius: 5px;
        height: 12rem;
        word-break: keep-all;
    }
    .submitBtn {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        button {
            padding: 5px 1.5rem;
        }
    }
`;

const CompleteDiv = styled.div`
    background-color: rgba( 0, 0, 0, 0.5 );
    width: 100vw;
    height: 100vh;
    margin: 0px;
    padding: 35vh 15vw;
    .popup {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 65%;
        height: 20%;
        padding: 2.5%;
        background: white;
        border-radius: 5px;
        button {
            background: skyblue;
            border: none;
            padding: 7px;
            width: 25vw;
            border-radius: 5px;
        }
    }
`;

export { ClaimBody, CompleteDiv };