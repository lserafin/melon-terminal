import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import * as S from './Nivo.styles';
import { formattedData } from '../chartData';

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

const data =
  // formattedData.map(item => {
  //   return {
  //     id: item.name,
  //     data: item.prices.map(price => {
  //       return { x: price.timestamp , y: price.price.toString() };
  //     }),
  //   };
  // });
  // console.log(data)

  [
    {
      id: 'japan',
      color: 'hsl(164, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 277,
        },
        {
          x: 'helicopter',
          y: 64,
        },
        {
          x: 'boat',
          y: 144,
        },
        {
          x: 'train',
          y: 218,
        },
        {
          x: 'subway',
          y: 90,
        },
        {
          x: 'bus',
          y: 213,
        },
        {
          x: 'car',
          y: 154,
        },
        {
          x: 'moto',
          y: 223,
        },
        {
          x: 'bicycle',
          y: 299,
        },
        {
          x: 'horse',
          y: 222,
        },
        {
          x: 'skateboard',
          y: 131,
        },
        {
          x: 'others',
          y: 273,
        },
      ],
    },
  ];

export const Nivo = () => {
  return (
    <S.Chart>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        areaOpacity={0.65}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 38,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </S.Chart>
  );
};
