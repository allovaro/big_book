import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { API_SERVER } from '../../config/constant';

import Income from '../../components/Card/Income';

const FinanceOverview = () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const account = useSelector((state) => state.account);
    const [ trCounts, setTrCounts ] = useState(0);
    const [ earnings, setEarnings ] = useState({
        cirill: 0,
        yuliya: 0,
        cashback: 0,
        another: 0,
        total: 0,
    });
    useEffect(() => {
        const start = `${month + 1}/1/${year}`;
        const end = month === 12 ? `1/1/${year + 1}` : `${month + 2}/1/${year}`;
        const fetchData = async () => {
            const [ counts, earnings ] = await Promise.all([
                fetch(`${API_SERVER}coinkeeper/expense/count`, {
                    method: "post",
                    headers: {
                        "Authorization": `${account.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ start, end })
                }),
                fetch(`${API_SERVER}coinkeeper/income`, {
                    method: "post",
                    headers: {
                        "Authorization": `${account.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ start, end })
                })
            ]);
            const { count } = await counts.json();
            // const { cirill, yuliya, cashback, another } = await earnings.json();
            setTrCounts(count);
            const earningsRes = await earnings.json();
            const total = (earningsRes.cirill + earningsRes.yuliya +
                earningsRes.cashback + earningsRes.another) / 100;
            setEarnings({
                cirill: Math.round(earningsRes.cirill),
                yuliya: Math.round(earningsRes.yuliya),
                cashback: Math.round(earningsRes.cashback),
                another: Math.round(earningsRes.another),
                total
            });
            // setEarnings(earningsRes);
        }
        fetchData();
    }, [month, year, account.token]);

    const { cirill, yuliya, cashback, another } = earnings;
    const total = Math.round((cirill + yuliya + cashback + another) / 1000);
    return (
        <React.Fragment>
            <Row>
                <Col xl={3}>
                    <Card>
                        <Card.Body className="border-bottom">
                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-hash f-30 text-c-green" />
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">{total}к</h3>
                                    <span className="d-block text-uppercase">total earnings</span>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-activity f-30 text-c-blue" />
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">{trCounts}</h3>
                                    <span className="d-block text-uppercase">total transactions</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={3} >
                    <Income data={earnings} />
                </Col>
            </Row>

        </React.Fragment>
    )
}

export default FinanceOverview;
