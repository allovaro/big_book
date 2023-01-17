import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { getTransactionsCount, getIncome } from '../../utils/fetchCoinkeeper';

import Income from '../../components/Card/Income';

const FinanceOverview = () => {
    const month = new Date().getMonth() + 1;
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
    const [ incomeMonth, setIncomeMonth ] = useState(month);
    const [ incomeYear, setIncomeYear ] = useState(year);

    const updateEarnings = async (month, year) => {
        const start = `${month}/1/${year}`;
        const end = month === 12 ? `1/1/${year + 1}` : `${month + 1}/1/${year}`;
        const earnings = await getIncome(account.token, start, end);
        setEarnings({
            cirill: Math.round(earnings.cirill),
            yuliya: Math.round(earnings.yuliya),
            cashback: Math.round(earnings.cashback),
            another: Math.round(earnings.another),
            total,
        });
    };

    useEffect(() => {
        const start = `${month}/1/${year}`;
        const end = month === 12 ? `1/1/${year + 1}` : `${month + 1}/1/${year}`;
        const fetchData = async () => {
            const [ count, earnings ] = await Promise.all([
                getTransactionsCount(account.token, start, end),
                getIncome(account.token, start, end),
            ]);
            setTrCounts(count);
            const total = (earnings.cirill + earnings.yuliya +
                earnings.cashback + earnings.another) / 100;
            setEarnings({
                cirill: Math.round(earnings.cirill),
                yuliya: Math.round(earnings.yuliya),
                cashback: Math.round(earnings.cashback),
                another: Math.round(earnings.another),
                total,
            });
        }
        fetchData();
    }, [month, year, account.token]);

    const onIncomeClick = async (e) => {
        if (e.target.id === 'prev_button') {
            if (incomeMonth === 1) {
                setIncomeMonth(12);
                setIncomeYear(incomeYear - 1);
                updateEarnings(12, incomeYear - 1);
                return;
            }
            setIncomeMonth(prevState => (prevState - 1));
            updateEarnings(incomeMonth - 1, incomeYear);
        }
        if (e.target.id === 'next_button') {
            if (incomeMonth === 12) {
                setIncomeMonth(1);
                setIncomeYear(incomeYear + 1);
                updateEarnings(1, incomeYear + 1);
                return;
            }
            setIncomeMonth((prevState) => (prevState + 1));
            updateEarnings(incomeMonth + 1, incomeYear);
        }
    }

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
                    <Income
                        data={earnings}
                        onChangeMonth={onIncomeClick}
                        month={incomeMonth}
                        year={incomeYear} />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default FinanceOverview;
