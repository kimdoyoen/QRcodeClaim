import React from 'react';

import { ClaimBody } from "../ClaimSubmitCSS.js";

function Elevator(props) {

    const ClaimArr = (e) => {
        if(e.target.checked) {
            let temp = [...props.ClaimArr];
            temp.push(e.target.value);
            props.setClaimArr(temp);
        }
        else {
            props.setClaimArr(props.ClaimArr.filter(claim => claim!==e.target.value));
        }
    }
    return (
        <ClaimBody>
            <h1>승강 설비 민원신고</h1>
            <div className="checkbox">
                <div>
                    <label>
                        <input type="checkbox" value="에스컬레이터가 멈췄어요/고장났어요" onClick={(e) => {ClaimArr(e)}} />
                        에스컬레이터가 멈췄어요/고장났어요
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="엘리베이터가 멈췄어요/고장났어요" onClick={(e) => {ClaimArr(e)}} />
                        엘리베이터가 멈췄어요/고장났어요
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="기타" onClick={(e) => {ClaimArr(e)}} />
                        기타
                    </label>
                </div>
                
                <textarea
                name="content"
                className="content"
                placeholder={"기타 사항이나 구체적인 민원 내용을 입력해주세요."}
                value={props.EtcContent}
                onChange={(e) => props.setEtcContent(e.currentTarget.value)}
                ></textarea>
                <div className="submitBtn">
                    <button onClick={props.SubmitHandler}>접수</button>
                </div>
            </div>
        </ClaimBody>
    )
}

export default Elevator
