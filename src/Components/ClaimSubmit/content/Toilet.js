import React from 'react';

import { ClaimBody } from "../ClaimSubmitCSS.js";

function Toilet(props) {

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
            <h1>화장실 내 민원신고</h1>
            <div className="checkbox">
                <div>
                    <label>
                        <input type="checkbox" value="화장실이 더러워요" onClick={(e) => {ClaimArr(e)}} />
                        화장실이 더러워요
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="화장지가 없어요" onClick={(e) => {ClaimArr(e)}} />
                        화장지가 없어요
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="변기가 고장났어요" onClick={(e) => {ClaimArr(e)}} />
                        변기가 고장났어요
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="휴지통이 다 찼어요" onClick={(e) => {ClaimArr(e)}} />
                        휴지통이 다 찼어요
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="전등이 고장났어요" onClick={(e) => {ClaimArr(e)}} />
                        전등이 고장났어요
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" value="비누/세정제가 다 떨어졌어요" onClick={(e) => {ClaimArr(e)}} />
                        비누/세정제가 다 떨어졌어요
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

export default Toilet
