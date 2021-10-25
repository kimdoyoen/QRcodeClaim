import React from 'react';

import { CompleteDiv } from "../ClaimSubmitCSS.js";

function SubmitComplete() {
    return (
        /*
        <CompleteDiv>
            <div className="popup">
                <p>
                    접수가 완료되었습니다.
                </p>
                <button onClick={() => { 
                    window.opener = null;
                    window.open('', '_self');
                    window.close();
                }}>확인</button>
            </div>
        </CompleteDiv>
        */
       <div style={{padding:"40vh 0", textAlign:"center"}}>
           접수가 완료되었습니다.
       </div>
    )
}

export default SubmitComplete
