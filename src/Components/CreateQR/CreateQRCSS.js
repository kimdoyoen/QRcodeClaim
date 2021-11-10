/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const CreateBody = styled.div`
    width: 80%;
    height: auto;
    margin: 0 auto;
`;

const CreateDiv = styled.div`
    display: inline-block;
    width: calc(50% - 4rem - 1px);
    height: 70vh;
    vertical-align: top;

    margin: 2rem 0;
    padding: 2% 2rem;
    border-right: 1px solid black;

    .category {
        display: flex;
        align-items: center;

        .createBtn {
            height: 3rem;

            padding: 0 1rem;

            border: none;
            border-radius: 1.5rem;
            background: rgb(168, 220, 255);
            font-size: 20px;

            cursor: pointer;
        }
    }

    .filter {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;

        margin-top: 1rem;
        padding-bottom: 1rem;

        width: 100%;

        border-bottom: 1px solid black;

        font-size: 13px;
        p {
            display: inline-block;
            margin: 0;
            margin-right: 10px;
        }
        .inputBox {
            height: 30px;
            width: 4rem;
            margin-right: 10px;
            font-size: 15px;
            border: 1.5px solid hsl(0, 0%, 80%);
            border-radius: 4px;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }

    .codeContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;

        padding: 2rem 0;

        border-bottom: 1px solid black;
        .QR {
            padding: 10px;
            border: 1rem solid;
        }
        .desc {
            font-size: 40px;
            font-weight: bold;
            text-align: center;
            svg {
                width: 5rem;
                height: 5rem;
            }
        }
    }
`;

const QRListDiv = styled.div`
    display: inline-block;
    width: 40%;

    margin: 2rem 0;
    padding: 2% 5%;

    p {
        font-size: 30px;
    }
`;

export { CreateBody,CreateDiv, QRListDiv };