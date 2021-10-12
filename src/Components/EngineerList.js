import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function EngineerList() {
    const [Engineer, setEngineer] = useState([]);
    const getInstanceToken = (phoneNum) => {
        /*
        getToken(messaging, { vapidKey: "BIyM4IW44g12x_pgw_yx2hAQyxIj4TUL8c6pEg0QKRPbzNP30FINEPQ7lDgmKbZeiyo8rNyF0h-asmWXZulA5H4" })
        .then((currentToken) => {
            if (currentToken) {
                console.log(currentToken);
            } else {
                console.log("??");
            }
        }).catch((err) => {
            console.log(err);
        })
        */
    }

    useEffect(() => {
        axios.post("/api/engineer/getEngineerList").then((response) => {
            if(response.data.success) {
                let temp = [...response.data.engineer];
                setEngineer(temp);
            }
        });
    }, []);

    return (
        <div style={{margin: "30px", border: "1px solid black"}}>
            {
                Engineer.length > 0 && (
                    Engineer.map((eng, idx) => {
                        return (
                            <div style={{padding: "30px", borderBottom: "1px solid black"}}>
                                <p>이름 : {eng.name}</p>
                                <p>연락처 : {eng.phoneNum}</p>
                                <button onClick={() => getInstanceToken(eng.phoneNum)}>디바이스 등록</button>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}

export default withRouter(EngineerList)
