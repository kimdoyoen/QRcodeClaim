/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const CreateBody = styled.div`
    width: 80%;
    height: auto;
    margin: 0 auto;

    .btnDiv {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        background: rgb(224, 224, 224);
        button {
            padding: 1rem 2rem;
            font-size: 20px;
            background: rgb(169, 219, 253);
            border: none;
            border-radius: 2px;
        }
    }
`;

const CreateDiv = styled.div`
    display: inline-block;
    width: calc(48% - 1px);
    height: 70vh;
    vertical-align: top;

    margin: 2rem 0;
    padding: 2% 1%;
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

        padding: 1rem 0;

        border-bottom: 1px solid black;
        .QR {
            padding: 10px;
            border: 1rem solid;
        }
        .desc {
            font-size: 15px;
            font-weight: bold;
            text-align: center;
            svg {
                width: 3rem;
                height: 3rem;
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

    .qrList {
        height: 50vh;
        padding: 1rem 2rem;
        border: 1px solid rgb(190, 190, 190);
        border-radius: 4px;
        p {
            margin: 0px;
            font-size: 20px;
            cursor: pointer;
        }
        .active {
            background-color: rgba(35, 44, 255, 0.59);
        }
    }
`;

export { CreateBody,CreateDiv, QRListDiv };