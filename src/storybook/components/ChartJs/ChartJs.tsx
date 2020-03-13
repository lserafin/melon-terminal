// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { formattedData } from '../chartData';

// console.log(formattedData);

// /**
//  * formattedData =
//  * [
//  *  {
//  *    name: string,
//  *    prices: [{price: BigNumber, timestamp: Date}]
//  *  }
//  * ]
//  */

// const data = {
//   // just want a single array of dates
//   labels: formattedData[0].prices.map(item => item.timestamp),
//   datasets: formattedData.map(item => {
//     return {
//       label: item.name,
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: item.prices.map(item => item.price.toFixed(4)),
//     };
//   }),
// };


// export const ChartJs = () => {
//   return <Line data={data} />;
// };
