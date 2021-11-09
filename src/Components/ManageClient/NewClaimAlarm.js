import React from 'react';
import { withRouter } from "react-router-dom";
import { ClaimAlarmDiv } from "./ManageClientCSS.js";

function NewClaimAlarm(props) {
    return (
        <ClaimAlarmDiv>
            <div className="container">
                <button className="close" onClick={() => props.setNewClaim({})}>X</button>
                <p className="content">새로운 민원이 접수되었습니다.</p>
                <button className="check" onClick={() => {
                    props.setNewClaim({});
                    props.history.push("/ClaimDetail/"+props.claim.claimNum);
                }}>처리</button>
            </div>
        </ClaimAlarmDiv>
    )
}

export default withRouter(NewClaimAlarm)