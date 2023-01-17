import React from 'react';
import { Card, Button } from 'react-bootstrap';

const monthLabes = ['Январе', 'Феврале', 'Марте',
    'Апреле', 'Мае', 'Июне',
    'Июле', 'Августе', 'Сентябре',
    'Октябре','Ноябре', 'Декабре'];

const Income = (props) => {
    const { cirill, yuliya, cashback, another, total } = props.data;

    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5" className="col-xl-12 mx-auto">
                    <Button id="prev_button" size="sm" variant="outline-secondary" onClick={props.onChangeMonth}>prev</Button>
                    Доходы в {monthLabes[props.month - 1]}
                    <Button id="next_button" size="sm" variant="outline-secondary" onClick={props.onChangeMonth}>next</Button>
                </Card.Title>
            </Card.Header>
            <Card.Body>
            <div className="row">
                    <div className="col-xl-12">
                        <h6 className="align-items-center float-left">
                            <i className="text-c-yellow" />Кирилл
                        </h6>
                        <h6 className="align-items-center float-right">₽{cirill}</h6>
                        <div className="progress m-t-30 m-b-20" style={{ height: '6px' }}>
                            <div
                                className="progress-bar progress-c-theme"
                                role="progressbar"
                                style={{ width: `${Math.round(cirill / total)}%` }}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            />
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <h6 className="align-items-center float-left">
                            <i className="text-c-yellow" />Юлия
                        </h6>
                        <h6 className="align-items-center float-right">₽{yuliya}</h6>
                        <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                            <div
                                className="progress-bar progress-c-theme"
                                role="progressbar"
                                style={{ width: `${Math.round(yuliya / total)}%` }}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            />
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <h6 className="align-items-center float-left">
                            <i className="text-c-yellow" />Кешбек
                        </h6>
                        <h6 className="align-items-center float-right">₽{cashback}</h6>
                        <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                            <div
                                className="progress-bar progress-c-theme"
                                role="progressbar"
                                style={{ width: `${Math.round(cashback / total)}%` }}
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
                        <h6 className="align-items-center float-right">₽{another}</h6>
                        <div className="progress m-t-30  m-b-20" style={{ height: '6px' }}>
                            <div
                                className="progress-bar progress-c-theme"
                                role="progressbar"
                                style={{ width: `${Math.round(another / total)}%` }}
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
