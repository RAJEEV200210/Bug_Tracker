import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const TrendChart = ({ tasks }) => {
    const calculateTrends = () => {
        const trends = {};
        tasks.forEach(task => {
            const startDate = new Date(task.startDate).toDateString();
            trends[startDate] = (trends[startDate] || 0) + 1;
        });
        return trends;
    };

    const trends = calculateTrends();
    const data = {
        labels: Object.keys(trends),
        datasets: [{
            label: 'Concurrent Tasks',
            data: Object.values(trends),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }]
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        }
    };

    return <Line data={data} options={options} />;
};

export default TrendChart;
