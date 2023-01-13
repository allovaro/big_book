import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { API_SERVER } from '../../config/constant';

import MonthPieStats from '../charts/nvd3-chart/chart/MonthPieStats';

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

    const setBudget = (category, value) => {
        fetch(`${API_SERVER}coinkeeper/settings/set_budget`, {
            method: "post",
            headers: {
                "Authorization": `${account.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ period: `${month + 1}/${year}`, category, value: value })
        });
    }

    const budgetInput = (e) => {
        const [ id ] = e.target.id.split('_');
        if (id === 'basic') setBasicBudget(e.target.value);
        else if (id === 'big') setBigBudget(e.target.value);
        else if (id === 'lifestyle') setLifestyleBudget(e.target.value);
        else if (id === 'periodic') setPeriodicBudget(e.target.value);
        else if (id === 'savings') setSavingsBudget(e.target.value);
    }

    return (
        <React.Fragment>
            <Row>
            <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">{months[new Date().getMonth()]} budget</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Form inline >
                                        <Form.Group className="mb-2">
                                            <Form.Label srOnly>Basic</Form.Label>
                                            <Form.Control plaintext readOnly defaultValue="Basic" />
                                        </Form.Group>
                                        <Form.Group className="mb-2 mr-3">
                                            <Form.Label srOnly>Value</Form.Label>
                                            <Form.Control id="basic_input" value={basicBudget} onChange={budgetInput} placeholder="Value" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button className="mb-0" onClick={() => { setBudget('basic', basicBudget) }}>Set</Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form inline >
                                        <Form.Group className="mb-2">
                                            <Form.Label srOnly>Lifestyle</Form.Label>
                                            <Form.Control plaintext readOnly defaultValue="Lifestyle" />
                                        </Form.Group>
                                        <Form.Group className="mb-2 mr-3">
                                            <Form.Label srOnly>Value</Form.Label>
                                            <Form.Control id="lifestyle_input" value={lifestyleBudget} onChange={budgetInput} placeholder="Value" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button className="mb-0" onClick={() => { setBudget('lifestyle', lifestyleBudget) }}>Set</Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form inline >
                                        <Form.Group className="mb-2">
                                            <Form.Label srOnly>Periodic</Form.Label>
                                            <Form.Control plaintext readOnly defaultValue="Periodic" />
                                        </Form.Group>
                                        <Form.Group className="mb-2 mr-3">
                                            <Form.Label srOnly>Value</Form.Label>
                                            <Form.Control id="periodic_input" value={periodicBudget} onChange={budgetInput} placeholder="Value" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button className="mb-0" onClick={() => { setBudget('periodic', periodicBudget) }}>Set</Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form inline >
                                        <Form.Group className="mb-2">
                                            <Form.Label srOnly>Big</Form.Label>
                                            <Form.Control plaintext readOnly defaultValue="Big" />
                                        </Form.Group>
                                        <Form.Group className="mb-2 mr-3">
                                            <Form.Label srOnly>Value</Form.Label>
                                            <Form.Control id="big_input" value={bigBudget} onChange={budgetInput} placeholder="Value" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button className="mb-0" onClick={() => { setBudget('big', bigBudget) }}>Set</Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form inline >
                                        <Form.Group className="mb-2">
                                            <Form.Label srOnly>Savings</Form.Label>
                                            <Form.Control plaintext readOnly defaultValue="Savings" />
                                        </Form.Group>
                                        <Form.Group className="mb-2 mr-3">
                                            <Form.Label srOnly>Value</Form.Label>
                                            <Form.Control id="savings_input" value={savingsBudget} onChange={budgetInput} placeholder="Value" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button className="mb-0" onClick={() => { setBudget('savings', savingsBudget) }}>Set</Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Бюджет соотношение</Card.Title>
                        </Card.Header>
                        <Card.Body className="text-center">
                            <MonthPieStats month={new Date().getMonth()}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Budget;