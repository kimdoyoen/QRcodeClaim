import React from 'react';

import { ClaimBody } from "../ClaimSubmitCSS.js";

function Train(props) {

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
            <h1>객차 내 민원신고</h1>
            <div className="checkbox">
                <div>
                    <label>
                        <input type="checkbox" value="객차가 더러워요" onClick={(e) => {ClaimArr(e)}} />
                        객차가 더러워요
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="너무 더워요" onClick={(e) => {ClaimArr(e)}} />
                        너무 더워요
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="너무 추워요" onClick={(e) => {ClaimArr(e)}} />
                        너무 추워요
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="피해를 주는 사람이 있어요(잡상인 등)" onClick={(e) => {ClaimArr(e)}} />
                        피해를 주는 사람이 있어요(잡상인 등)
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="마스크 안 쓴 사람이 있어요" onClick={(e) => {ClaimArr(e)}} />
                        마스크 안 쓴 사람이 있어요
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="문이 고장났어요" onClick={(e) => {ClaimArr(e)}} />
                        문이 고장났어요
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
                    <button onClick={() => props.setCheckContent(true)}>접수</button>
                </div>
            </div>
        </ClaimBody>
    )
}

export default Train
