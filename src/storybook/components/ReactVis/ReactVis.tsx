import React from 'react';
// @ts-ignore
import { XAxis, YAxis, XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines } from 'react-vis';
import '../../../../node_modules/react-vis/dist/style.css';
import { formattedData } from '../chartData'

console.log(formattedData);
/**
 * formattedData =
 * [
 *  {
 *    name: string,
 *    prices: [{price: BigNumber, timestamp: Date}]
 *  }
 * ]
 */

const data = [
  { x: 0, y: 8 },
  { x: 1, y: 5 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 1 },
  { x: 5, y: 7 },
  { x: 6, y: 6 },
  { x: 7, y: 3 },
  { x: 8, y: 2 },
  { x: 9, y: 0 },
];

export const ReactVis = () => {
  return (
    <XYPlot height={300} width={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <LineSeries data={data} />
    </XYPlot>
  );
};
