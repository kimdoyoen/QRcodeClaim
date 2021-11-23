import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import ClaimList from './ClaimList/ClaimList.js';
import ClaimChart from './ClaimChart/ClaimChart.js';
import NewClaimAlarm from './NewClaimAlarm.js';
import { ManageBody, HeaderDiv } from "./ManageClientCSS.js";

import axios from 'axios';

function Main(props) {
    const [Category, setCategory] = useState("민원 리스트");
    const [Socket, setSocket] = useState();
    const [NewClaim, setNewClaim] = useState({});

    useEffect(() => {
        axios.get("/api/user/auth").then((response) => {
            if(response.data.isAuth) {
                alert("토큰 존재");
            } else {
                alert("토큰 없음");
                props.history.goBack();
            }
        });
    }, []);

    // axios.get("/api/login/auth").then((response) => {
    //     if(response.data.success) {
    //         alert("토큰 존재");
    //     } else {
    //         alert("토큰 없음");
    //     }
    // });


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


    const LogoutHandler = async() => {
        await axios.post("api/user/logout").then((response) => {
            if(response.data.success) {
                alert("로그아웃 성공");
                props.history.push("login");
            } else {
                alert("에러 발생");
            }
        })
    }

    return (
        <ManageBody>
            <HeaderDiv>
                <div className="category">
                    <button className={Category==="민원 리스트" ? "active" : null} onClick={() => setCategory("민원 리스트")}>민원 리스트</button>
                    <button className={Category==="민원 통계" ? "active" : null} onClick={() => setCategory("민원 통계")}>민원 통계</button>
                    <Link to="/makeNewQR" style={{marginBottom: "50px"}}>
                        <button className="active">QR code 생성하기</button>
                    </Link>
                    <button className="active" onClick={LogoutHandler}>로그아웃</button>
                </div>
            </HeaderDiv>
            {
                Category === "민원 리스트"
                ? <ClaimList NewClaim={NewClaim}/>
                : <ClaimChart />
            }
            {
                NewClaim.claimNum && <NewClaimAlarm claim={NewClaim} setNewClaim={setNewClaim}/>
            }
        </ManageBody>
    )
}

export default Main