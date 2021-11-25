import { assertExportDefaultSpecifier } from '@babel/types';
import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { RegDiv } from "./RegisterCSS.js";

function RegisterEngineer(props) {
    const [Name, setName] = useState("");
    const [ID, setID] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordRe, setPasswordRe] = useState("");
    const [PhoneNumber1, setPhoneNumber1] = useState("");
    const [PhoneNumber2, setPhoneNumber2] = useState("");
    const [PhoneNumber3, setPhoneNumber3] = useState("");
    const [Email, setEmail] = useState("");
    const [Pos, setPos] = useState("");
    var Idchecked = false;

    const SubmitHandler = async() => {
        if(!Pos) {
            alert("관리자/설비 담당자를 선택해주세요.");
            return;
        }
        if(!Name) {
            alert("이름을 입력해주세요.");
            return;
        }
        if(!ID) {
            alert("아이디를 입력해주세요.");
            return;
        }
        if(!Password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }
        if(!PasswordRe) {
            alert("비밀번호를 입력해주새요.");
            return;
        }
        if(Password != PasswordRe) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if(!PhoneNumber1 || !PhoneNumber2 || !PhoneNumber3) {
            alert("연락처를 다시 입력해주세요.");
            return;
        }
        if(!Email) {
            alert("이메일을 입력해주세요");
            return;
        }
        if(!Idchecked) {
            alert("아이디 중복 확인해주세요.");
            return;
        }


        let body = {
            name: Name,
            userID: ID,
            pw: Password,
            phone: PhoneNumber1+"-"+PhoneNumber2+"-"+PhoneNumber3,
            email: Email,
            type: Pos,
            token: ""
        }

        await axios.post("/api/engineer/user", body).then((response) => {
            if(response.data.success) {
                alert("등록 성공");
                props.history.push("/login");
            } else {
                alert("실패");
            }
        });
    };

    const IdCheck = async() => {
        if(!ID) {
            alert("아이디를 입력해주세요.");
            return;
        }

        let body = {
            userID: ID
        }

        await axios.post("/api/engineer/idcheck", body).then((response) => {
            if(response.data.success) {
                alert("사용 가능한 아이디입니다!");
                Idchecked = true;
            }
            else {
                alert("사용 불가능한 아이디입니다.")
            }
        });
    };

    return (
        <RegDiv>
            <table>
                <thead></thead>
                <tbody>
                    <tr>
                        <td>이름</td>
                        <td><input value={Name} size="25" onChange={(e)=> setName(e.currentTarget.value)} /></td>
                    </tr>
                    <tr>
                        <td>아이디</td>
                        <td><input value={ID} size="25" onChange={(e)=> setID(e.currentTarget.value)} /></td>
                    </tr>
                    <tr classname="idcheck">
                        <td></td>
                        <td><button onClick={IdCheck}>아이디 중복 확인</button></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="password" value={Password} size="25" onChange={(e)=> setPassword(e.currentTarget.value)} /></td>
                    </tr>
                    <tr>
                        <td>비밀번호 확인</td>
                        <td><input type="password" value={PasswordRe} size="25" onChange={(e)=> setPasswordRe(e.currentTarget.value)} /></td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td>
                            <input value={PhoneNumber1} maxLength="4" size="4" onChange={(e)=> setPhoneNumber1(e.currentTarget.value)} />
                            -
                            <input value={PhoneNumber2} maxLength="4" size="4" onChange={(e)=> setPhoneNumber2(e.currentTarget.value)} />
                            -
                            <input value={PhoneNumber3} maxLength="4" size="4" onChange={(e)=> setPhoneNumber3(e.currentTarget.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td><input type="email" value={Email} size="25" onChange={(e)=> setEmail(e.currentTarget.value)} /></td>
                    </tr>
                    <tr>
                        <td>역할</td>
                        <td>
                            <div>
                                <label><input type="radio" name="Position" onChange={(e)=> setPos("관리자")} /> 관리자</label>
                                <label><input type="radio" name="Position" onChange={(e)=> setPos("설비담당자")} /> 담당자</label>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="btnDiv">
                <button classname="btnDiv" onClick={() => {props.history.push("/login")}}>취소</button>
                <button onClick={SubmitHandler}>완료</button>
            </div>
        </RegDiv>
    )
}

export default withRouter(RegisterEngineer)