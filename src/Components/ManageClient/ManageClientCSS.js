/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const ManageBody = styled.div`
    width: 80%;
    height: auto;
    margin: 0 auto;
`;

const HeaderDiv = styled.div`
    margin-top: 30px;
    .category {
        margin-top: 10px;
        button {
            background: light-gray;
            color: gray;
            padding: 5px 10px;
            margin-right: 10px;
            border-radius: 15px;
            border: none;
        }
        .active {
            background: gray;
            color: black;
            font-weight: bold;
        }
    }
`;

export { ManageBody, HeaderDiv };
