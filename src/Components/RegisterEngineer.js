import axios from 'axios';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function RegisterEngineer(props) {
    const [Name, setName] = useState("");
    const [PhoneNumber1, setPhoneNumber1] = useState("");
    const [PhoneNumber2, setPhoneNumber2] = useState("");
    const [PhoneNumber3, setPhoneNumber3] = useState("");

    const SubmitHandler = () => {
        if(!Name) {
            alert("이름을 입력해주세요.");
            return;
        }
        if(!PhoneNumber1 || !PhoneNumber2 || !PhoneNumber3) {
            alert("연락처를 다시 입력해주세요.");
            return;
        }

        let body = {
            name: Name,
            phoneNum: PhoneNumber1+"-"+PhoneNumber2+"-"+PhoneNumber3,
        }

        axios.post("/api/engineer/register", body).then((response) => {
            if(response.data.success) {
                alert("등록 성공");
                props.history.push("/");
            } else {
                alert("실패");
            }
        });
    };

    return (
        <div>
            <div>
                이름:
                <input value={Name} onChange={(e)=> setName(e.currentTarget.value)} />
            </div>
            <div>
                연락처:
                <input value={PhoneNumber1} maxLength="4" onChange={(e)=> setPhoneNumber1(e.currentTarget.value)} />
                -
                <input value={PhoneNumber2} maxLength="4" onChange={(e)=> setPhoneNumber2(e.currentTarget.value)} />
                -
                <input value={PhoneNumber3} maxLength="4" onChange={(e)=> setPhoneNumber3(e.currentTarget.value)} />
            </div>
            <button onClick={() => {props.history.push("/")}}>취소</button>
            <button onClick={SubmitHandler}>등록하기</button>
        </div>
    )
}

export default withRouter(RegisterEngineer)
