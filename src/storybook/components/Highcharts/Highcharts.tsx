import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { formattedData } from '../chartData';

console.log(formattedData);

const priceData = [
  [1583521838, 85],
  [1583520841, 158],
  [1583519114, 15],
];

const options: Highcharts.Options = {
  // // rangeSelector: {
  // //     selected: 4
  // // },
  // chart: {
  //   type: 'line',
  // },
  // yAxis: {
  //   labels: {

  //   },
  //   plotLines: [
  //     {
  //       value: 0,
  //       width: 2,
  //       color: 'silver',
  //     },
  //   ],
  // },

  // // xAxis: {
  // //   type: 'datetime',
  // //   labels: {
  // //     formatter: function() {
  // //       console.log(this);
  // //       return this.value.toString();
  // //     },
  // //   },
  // // },

  // plotOptions: {
  //   series: {
  //     // compare: 'percent',
  //     showInNavigator: true,
  //   },
  // },

  // tooltip: {
  //   pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
  //   valueDecimals: 2,
  //   split: true,
  // },

  // series: formattedData,
  chart: {
    type: 'spline'
  },
  xAxis: {
    categories: formattedData[0].data.map(price => price[0]),
  },
  series: formattedData,
};

export const Highchart = () => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

// {
// name: btc, 
// data: [[date, price], [date, price]]
// }