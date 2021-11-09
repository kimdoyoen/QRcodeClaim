import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

import { LoginDiv } from "./UserCSS.js";

function Login(props) {
    return (
        <LoginDiv>
            <img src="Img/logo.jpg" />
            <div className="inputContainer">
                <div>
                    <label>아이디</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>비밀번호</label>
                    <input type="password"/>
                </div>
            </div>
            <div className="btnDiv">
                <button>로그인</button>
                <button>회원가입</button>
            </div>
        </LoginDiv>
    )
}

export default withRouter(Login)
