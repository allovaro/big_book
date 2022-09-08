import React, { useEffect } from 'react';
import 'amcharts3/amcharts/amcharts';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import AmCharts from '@amcharts/amcharts3-react';

const AmChartStatistics6 = (props) => {
    useEffect(() => {
        AmCharts.makeChart('bar-chart2', {
            type: 'serial',
            theme: 'light',
            marginTop: 10,
            marginRight: 0,
            valueAxes: [
                {
                    id: 'v1',
                    position: 'left',
                    axisAlpha: 0,
                    lineAlpha: 0,
                    autoGridCount: false,
                    labelFunction: function (value) {
                        return +Math.round(value) + '00';
                    }
                }
            ],
            graphs: [
                {
                    id: 'g2',
                    valueAxis: 'v1',
                    lineColor: ['#a389d4', '#899ed4'],
                    fillColors: ['#a389d4', '#899ed4'],
                    fillAlphas: 1,
                    type: 'column',
                    title: 'ПЛАН ',
                    valueField: 'plan',
                    columnWidth: 0.3,
                    legendValueText: '$[[value]]M',
                    balloonText: "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
                },
                {
                    id: 'g3',
                    valueAxis: 'v1',
                    lineColor: ['#04a9f5', '#049df5'],
                    fillColors: ['#04a9f5', '#049df5'],
                    fillAlphas: 1,
                    type: 'column',
                    title: 'РЕАЛЬНОСТЬ',
                    valueField: 'real',
                    columnWidth: 0.3,
                    legendValueText: '$[[value]]M',
                    balloonText: "[[title]]<br /><b style='font-size: 130%'>$[[value]]M</b>"
                }
            ],
            chartCursor: {
                pan: true,
                valueLineEnabled: true,
                valueLineBalloonEnabled: true,
                cursorAlpha: 0,
                valueLineAlpha: 0.2
            },
            categoryField: 'Year',
            categoryAxis: {
                dashLength: 1,
                gridAlpha: 0,
                axisAlpha: 0,
                lineAlpha: 0,
                minorGridEnabled: true
            },
            legend: {
                useGraphSettings: true,
                position: 'top'
            },
            balloon: {
                borderThickness: 1,
                shadowAlpha: 0
            },
            dataProvider: [
                {
                    Year: 'Обязательные',
                    plan: 4,
                    real: 3
                },
                {
                    Year: 'Накопления',
                    plan: 7,
                    real: 5
                },
                {
                    Year: 'Переодические',
                    plan: 3,
                    real: 4
                },
                {
                    Year: 'Крупные',
                    plan: 6,
                    real: 4
                }
            ]
        });
    });

    return <div id="bar-chart2" className="bar-chart2" style={{ width: '100%', height: props.height }} />;
};

export default AmChartStatistics6;
