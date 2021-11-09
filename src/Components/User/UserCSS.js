/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;

    width: 50%;
    height: 100vh;

    margin: 0 auto;
    img {
        width: 80%;
    }
    .inputContainer {
        width: 80%;
        div {
            width: 100%;
            margin: 0 auto;
            font-size: 20px;
            label {
                display: inline-block;
                width: 40%;
                height: 100%;
                line-height: 100%;
                text-align: center;
            }
            input {
                display: inline-block;
                width: 50%;
                height: 2rem;
                marign: 0px;
                margin-bottom: 0.5rem;
                border-radius: 4px;
                border: 1px solid rgb(94, 94, 94);
            }
        }
    }
    .btnDiv {
        display: flex;

        width: 80%;
        margin: 2rem auto;
        justify-content: space-evenly;

        button {
            padding: 1rem 1.5rem;
            background: rgb(224, 224, 224);
            border: none;
            border-radius: 4px;
            font-size: 20px;
            cursor: pointer;
        }
    }
`;

export { LoginDiv };