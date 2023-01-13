import React from 'react';
import { Card } from 'react-bootstrap';

const monthLabes = ['Январе', 'Феврале', 'Марте',
    'Апреле', 'Мае', 'Июне',
    'Июле', 'Августе', 'Сентябре',
    'Октябре','Ноябре', 'Декабре'];

const IncomeNew = (props) => {
    const { cirill, yuliya, cashback, another } = props.data;
    const total = Math.round((cirill + yuliya + cashback + another) );
    return (
        <Card className="card-social">
            <Card.Body className="border-bottom">
                <div className="row align-items-center justify-content-center">
                    <div className="col text-center">
                        <h3>Доходы в {monthLabes[new Date().getMonth()]}</h3>
                        <h2>{total}к</h2>
                    </div>
                </div>
            </Card.Body>
            <Card.Body>
                <div className="row align-items-center justify-content-center card-active">
                    <div className="col-3">
                        <h6 className="text-center m-b-10">
                            <span className="text-muted m-r-5">Кирилл:</span>{Math.round(cirill)}
                        </h6>
                    </div>
                    <div className="col-3">
                        <h6 className="text-center  m-b-10">
                            <span className="text-muted m-r-5">Юлия:</span>{Math.round(yuliya)}
                        </h6>
                    </div>
                    <div className="col-3">
                        <h6 className="text-center m-b-10">
                            <span className="text-muted m-r-5">Кешбек:</span>{Math.round(cashback)}
                        </h6>
                    </div>
                    <div className="col-3">
                        <h6 className="text-center  m-b-10">
                            <span className="text-muted m-r-5">Остальное:</span>{Math.round(another)}
                        </h6>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default IncomeNew;
