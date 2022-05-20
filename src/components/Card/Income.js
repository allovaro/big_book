import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { API_SERVER } from '../../config/constant';

const Income = () => {
    const account = useSelector((state) => state.account);
    const [income, setIncome] = useState({
        cirill: 'loading', yuliya: 0, cashback: 0, another: 0
    });

    useEffect(()=>{
        fetch(`${API_SERVER}coinkeeper/income`, {
                method: "post",
                headers: {
                    "Authorization": `${account.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ start: '01/01/2022', end: '03/01/2022' })
            })
            .then(response => response.json())
            .then(setIncome)
            }, [account.token]);

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">Доходы в Мае</Card.Title>
            </Card.Header>
            <Card.Body>
            <div className="row">
                    <div className="col-xl-12">
                        <h6 className="align-items-center float-left">
                            <i className="text-c-yellow" />Кирилл
                        </h6>
                        <h6 className="align-items-center float-right">₽{income.cirill}</h6>
                        <div className="progress m-t-30 m-b-20" style={{ height: '6px' }}>
                            <div
                                className="progress-bar progress-c-theme"
                                role="progressbar"
                                style={{ width: '70%' }}
                                aria-valuenow="70"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            />
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <h6 className="align-items-center float-left">
                            <i className="text-c-yellow" />Юлия
                        </h6>
                        <h6 className="align-items-center float-right">₽{income.yuliya}</h6>
                        <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                            <div
                                className="progress-bar progress-c-theme"
                                role="progressbar"
                                style={{ width: '35%' }}
                                aria-valuenow="35"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            />
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <h6 className="align-items-center float-left">
                            <i className="text-c-yellow" />Кешбек
                        </h6>
                        <h6 className="align-items-center float-right">₽{income.cashback}</h6>
                        <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                            <div
                                className="progress-bar progress-c-theme"
                                role="progressbar"
                                style={{ width: '25%' }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            />
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <h6 className="align-items-center float-left">
                            <i className="text-c-yellow" />Другое
                        </h6>
                        <h6 className="align-items-center float-right">₽{income.another}</h6>
                        <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                            <div
                                className="progress-bar progress-c-theme"
                                role="progressbar"
                                style={{ width: '10%' }}
                                aria-valuenow="10"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            />
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Income;
