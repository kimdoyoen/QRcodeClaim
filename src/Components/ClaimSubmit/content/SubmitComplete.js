import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { CompleteDiv } from "../ClaimSubmitCSS.js";

function SubmitComplete(props) {
    
    return (
       <CompleteDiv>
           <p className="title">접수가 완료되었습니다.</p>
           <div className="content">
               귀하께서 신고하신 민원은 최대한 빠른 시간 내에 처리하도록 하겠습니다. 항상 관심과 사랑을 가져주셔서 대단히 감사하며,
               늘 시민의 편익을 위해 노력하는 서울교통공사가 되도록 하겠습니다.<br /><br />
               접수하신 내용이 처리되었는지 확인하려면 추후 아래 링크로 접속하셔서 해당 접수 코드를 입력해보세요.
           </div>
           <Link to={`ClaimDetail/${props.url}`}>http://localhost/ClaimDetail/{props.url}</Link>
       </CompleteDiv>
    )
}

export default SubmitComplete
