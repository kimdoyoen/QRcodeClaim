import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import ClaimList from './ClaimList/ClaimList.js';
import NewClaimAlarm from './NewClaimAlarm.js';
import { ManageBody, HeaderDiv } from "./ManageClientCSS.js";

function Main() {
    const [Category, setCategory] = useState("민원 리스트");
    const [Socket, setSocket] = useState();
    const [NewClaim, setNewClaim] = useState({});

    useEffect(() => {
        setSocket(socketio.connect("http://localhost:5000"));
    }, []);

    useEffect(() => {
        if(Socket) {
            Socket.emit("init", { name: 'doyeon'});

            Socket.on("connected", (msg) => {
                console.log(msg);
            });
            Socket.on("new", (msg) => {
                setNewClaim(msg);
            });
        }
    }, [Socket]);

    return (
        <ManageBody>
            <HeaderDiv>
                <div className="category">
                    <button className={Category==="민원 리스트" ? "active" : null} onClick={() => setCategory("민원 리스트")}>민원 리스트</button>
                    <button className={Category==="민원 통계" ? "active" : null} onClick={() => setCategory("민원 통계")}>민원 통계</button>
                    <Link to="/makeNewQR" style={{marginBottom: "50px"}}>
                        <button className="active">QR code 생성하기</button>
                    </Link>
                </div>
            </HeaderDiv>
            {
                Category === "민원 리스트"
                ? <ClaimList NewClaim={NewClaim}/>
                : null
            }
            {
                NewClaim.claimNum && <NewClaimAlarm claim={NewClaim} setNewClaim={setNewClaim}/>
            }
        </ManageBody>
    )
}

export default Main
