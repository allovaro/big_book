import React, { useState, useEffect } from 'react';
import NVD3Chart from 'react-nvd3';
import { useSelector } from 'react-redux';
import { API_SERVER } from '../../../../config/constant';


const monthesArr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const PieBasicChart = (props) => {
    const account = useSelector((state) => state.account);
    const [datum, setDatum] = useState([
        { key: 'Базовые', y: 0, color: '#ff8a65' },
        { key: 'Лайфстайл', y: 0, color: '#f4c22b' },
        { key: 'Долги', y: 0, color: '#04a9f5' },
        { key: 'Сбережения', y: 0, color: '#3ebfea' },
    ]);

    useEffect(()=>{
        fetch(`${API_SERVER}coinkeeper/expense/statistics`, {
                method: "post",
                headers: {
                    "Authorization": `${account.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ start: '01/01/2022', end: '03/01/2022' })
            })
            .then(response => response.json())
            .then(response => {
                const base = response.base.years[response.base.years.length - 1].month[monthesArr[props.month]];
                const lifestyle = response.lifestyle.years[response.lifestyle.years.length - 1].month[monthesArr[props.month]];
                const loans = response.loans.years[response.loans.years.length - 1].month[monthesArr[props.month]];
                const savings = response.savings.years[response.savings.years.length - 1].month[monthesArr[props.month]];
                setDatum([
                    { key: `Базовые`, y: Math.round(base), color: '#ff8a65' },
                    { key: `Лайфстайл`, y: Math.round(lifestyle), color: '#f4c22b' },
                    { key: `Долги`, y: Math.round(loans), color: '#04a9f5' },
                    { key: `Сбережения`, y: Math.round(savings), color: '#3ebfea' },
                ])
            })
            }, [props.month, account.token]);

    return <NVD3Chart id="chart" height={300} labelType="percent" type="pieChart" datum={datum} x="key" y="y" />;
};

export default PieBasicChart;
