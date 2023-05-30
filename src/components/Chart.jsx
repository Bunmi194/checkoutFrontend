import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import "./chart.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const options = {
  circumference: 180,
  rotation: 270,
  responsive: true,
  cutout: "80%",
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart showing money flow',
    },
  },
};

const data = {
    labels: ['Red', 'Blue'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 0.1,
        weight: 0.1,
        spacing: 0.1,
      },
    ],
};

const Chart = () => {
  return (
    <div className='checkout__doughnut__wrapper'>
        <div className='checkout__doughnut__div'>
            <Doughnut options={options} data={data} />
        </div>
        <div className='checkout__doughnut__values'>
            <div>
                <p>Credit</p>
                <p>30,000</p>
            </div>
            <div>
                <p>Balance</p>
                <p>13,000</p>
            </div>
            <div>
                <p>Debit</p>
                <p>17,000</p>
            </div>
        </div>
    </div>
  )
}

export default Chart;
