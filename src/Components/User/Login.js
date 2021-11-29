import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

import { LoginDiv } from "./UserCSS.js";

function Login(props) {
    const [ID, setID] = useState("");
    const [Password, setPassword] = useState("");

    const SubmitHandler = async() => {
        if(!ID) {
            alert("아이디를 입력해주세요.");
            return;
        }
        if(!Password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        let body = {
            userID: ID,
            pw: Password
        }

        await axios.post("/api/user/login", body).then((response) => {
            if(response.data.success) {
                props.history.push("/");
            } else {
                alert("에러")
            }
        });
    };

    return (
        <LoginDiv>
            <img src="Img/logo.jpg" />
            <div className="inputContainer">
                <div>
                    <label>아이디</label>
                    <input type="text" value={ID} onChange={(e)=> setID(e.currentTarget.value)} />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input type="password" value={Password} onChange={(e)=> setPassword(e.currentTarget.value)} />
                </div>
            </div>
            <div className="btnDiv">
                <button onClick={SubmitHandler}>로그인</button>
                <Link to="/register">
                    <button>회원가입</button>
                </Link>
            </div>
        </LoginDiv>
    )
}

export default withRouter(Login)
