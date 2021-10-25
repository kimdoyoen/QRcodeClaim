import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ManageBody, HeaderDiv } from "./ManageClientCSS.js";
import axios from 'axios';

function Main() {
    const [QRList, setQRList] = useState([]);
    const [Category, setCategory] = useState("민원 리스트");

    return (
        <ManageBody>
            <HeaderDiv>
                <Link to="/makeNewQR" style={{marginBottom: "50px"}}>
                    <button>QR code 생성하기</button>
                </Link>
                <div className="category">
                    <button className={Category==="민원 리스트" ? "active" : null} onClick={() => setCategory("민원 리스트")}>민원 리스트</button>
                    <button className={Category==="민원 통계" ? "active" : null} onClick={() => setCategory("민원 통계")}>민원 통계</button>
                </div>
            </HeaderDiv>
        </ManageBody>
    )
}

export default Main
