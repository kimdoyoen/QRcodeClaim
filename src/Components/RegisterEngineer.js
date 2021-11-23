import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

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

    return (
        <div>
            <div>
                이름
                <input value={Name} onChange={(e)=> setName(e.currentTarget.value)} />
            </div>
            <div>
                아이디
                <input value={ID} onChange={(e)=> setID(e.currentTarget.value)} />
            </div>
            <div>
                비밀번호
                <input type="password" value={Password} onChange={(e)=> setPassword(e.currentTarget.value)} />
            </div>
            <div>
                비밀번호 확인
                <input type="password" value={PasswordRe} onChange={(e)=> setPasswordRe(e.currentTarget.value)} />
            </div>
            <div>
                전화번호
                <input value={PhoneNumber1} maxLength="4" onChange={(e)=> setPhoneNumber1(e.currentTarget.value)} />
                -
                <input value={PhoneNumber2} maxLength="4" onChange={(e)=> setPhoneNumber2(e.currentTarget.value)} />
                -
                <input value={PhoneNumber3} maxLength="4" onChange={(e)=> setPhoneNumber3(e.currentTarget.value)} />
            </div>
            <div>
                이메일
                <input type="email" value={Email} onChange={(e)=> setEmail(e.currentTarget.value)} />
            </div>
            <div>
                역할
                <label><input type="radio" name="Position" onChange={(e)=> setPos("관리자")} />관리자</label>
                <label><input type="radio" name="Position" onChange={(e)=> setPos("설비담당자")} />설비 담당자</label>
            </div>

            <button onClick={() => {props.history.push("/login")}}>취소</button>
            <button onClick={SubmitHandler}>등록하기</button>
        </div>
    )
}

export default withRouter(RegisterEngineer)