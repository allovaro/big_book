import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { API_SERVER } from '../../config/constant';

const Budget = () => {
    const account = useSelector((state) => state.account);
    const [ basicBudget, setBasicBudget ] = useState(0);
    const [ bigBudget, setBigBudget ] = useState(0);
    const [ lifestyleBudget, setLifestyleBudget ] = useState(0);
    const [ periodicBudget, setPeriodicBudget ] = useState(0);
    const [ savingsBudget, setSavingsBudget ] = useState(0);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    useEffect(() => {
        fetch(`${API_SERVER}coinkeeper/settings/get_budget`, {
            method: "post",
            headers: {
                "Authorization": `${account.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ period: `${month + 1}/${year}` })
        })
        .then(response => response.json())
        .then(response => {
            const { basic, savings, periodic, big, lifestyle } = response;
            setBasicBudget(basic);
            setBigBudget(big);
            setLifestyleBudget(lifestyle);
            setPeriodicBudget(periodic);
            setSavingsBudget(savings);
        });
    }, [month, year, account.token]);

    const budgetInput = (e) => {
        const [ id ] = e.target.id.split('_');
        fetch(`${API_SERVER}coinkeeper/settings/set_budget`, {
            method: "post",
            headers: {
                "Authorization": `${account.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ period: `${month + 1}/${year}`, category: id, value: e.target.value })
        });
        if (id === 'basic') setBasicBudget(e.target.value);
        else if (id === 'big') setBigBudget(e.target.value);
        else if (id === 'lifestyle') setLifestyleBudget(e.target.value);
        else if (id === 'periodic') setPeriodicBudget(e.target.value);
        else if (id === 'savings') setSavingsBudget(e.target.value);
    }

    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">{months[new Date().getMonth()]} budget</h6>
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" >Basic</span>
                                </div>
                                <input type="text" id="basic_input" className="form-control" value={basicBudget} onChange={budgetInput} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" >Lifestyle</span>
                                </div>
                                <input type="text" id="lifestyle_input" className="form-control" value={lifestyleBudget} onChange={budgetInput} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" >Periodic</span>
                                </div>
                                <input type="text" id="periodic_input"className="form-control" value={periodicBudget} onChange={budgetInput} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" >Big</span>
                                </div>
                                <input type="text" id="big_input" className="form-control" value={bigBudget} onChange={budgetInput} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" >Savings</span>
                                </div>
                                <input type="text" id="savings_input" className="form-control" value={savingsBudget} onChange={budgetInput} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">Monthly Sales</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-down text-c-red f-30 m-r-5" /> $2.942.32
                                    </h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">36%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div
                                    className="progress-bar progress-c-theme2"
                                    role="progressbar"
                                    style={{ width: '35%' }}
                                    aria-valuenow="35"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">Monthly Sales</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-down text-c-red f-30 m-r-5" /> $2.942.32
                                    </h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">36%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div
                                    className="progress-bar progress-c-theme2"
                                    role="progressbar"
                                    style={{ width: '35%' }}
                                    aria-valuenow="35"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Budget;