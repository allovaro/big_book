import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { API_SERVER } from '../../config/constant';

const IncomeNew = () => {
    const account = useSelector((state) => state.account);
    const [income, setIncome] = useState({
        cirill: 0, yuliya: 0, cashback: 0, another: 0, total: 0,
    });

    useEffect(()=>{
        fetch(`${API_SERVER}coinkeeper/income`, {
                method: "post",
                headers: {
                    "Authorization": `${account.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ start: '04/01/2022', end: '04/31/2022' })
            })
            .then(response => response.json())
            .then(response => {
                const total = (response.cirill + response.yuliya +
                    response.cashback + response.another) / 100;
                setIncome({
                    cirill: Math.round(response.cirill),
                    yuliya: Math.round(response.yuliya),
                    cashback: Math.round(response.cashback),
                    another: Math.round(response.another),
                    total});
                console.log(`${Math.round(response.cirill / total)}%`);
            })
            }, [account.token]);
    
            return (
                <Card className="card-social">
                        <Card.Body className="border-bottom">
                            <div className="row align-items-center justify-content-center">
                                <div className="col text-center">
                                    <h3>Доходы</h3>
                                    <h2>12,281</h2>
                                    <h5 className="text-c-green mb-0">
                                        +7.2% <span className="text-muted">Lj[jl</span>
                                    </h5>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="row align-items-center justify-content-center card-active">
                                <div className="col-3">
                                    <h5 className="text-center m-b-10">
                                        35%
                                    </h5>
                                </div>
                                <div className="col-3">
                                    <h6 className="text-center  m-b-10">
                                        <span className="text-muted m-r-5">Duration:</span>350
                                    </h6>
                                </div>
                                <div className="col-3">
                                    <h6 className="text-center m-b-10">
                                        <span className="text-muted m-r-5">Target:</span>35,098
                                    </h6>
                                </div>
                                <div className="col-3">
                                    <h6 className="text-center  m-b-10">
                                        <span className="text-muted m-r-5">Duration:</span>350
                                    </h6>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
               
            );
}

export default IncomeNew;
