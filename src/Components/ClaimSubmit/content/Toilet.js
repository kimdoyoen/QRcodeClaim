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
            <div className="desc">
                민원을 신고해주셔서 감사합니다. <br />
                본 민원 신고 서비스는 QR코드를 이용하여 보다 편리하고 빠르게 민원을 처리하는 시스템입니다. 민원 접수 시, 관리자에게 적시 전달되며, 해당 민원 처리 결과는 접수 후 제공되는 링크를 통해 확인하실 수 있습니다.
            </div>
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
