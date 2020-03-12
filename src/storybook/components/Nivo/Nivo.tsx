import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import * as S from './Nivo.styles';

const data = [
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
  {
    id: 'france',
    color: 'hsl(116, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 36,
      },
      {
        x: 'helicopter',
        y: 66,
      },
      {
        x: 'boat',
        y: 145,
      },
      {
        x: 'train',
        y: 112,
      },
      {
        x: 'subway',
        y: 261,
      },
      {
        x: 'bus',
        y: 66,
      },
      {
        x: 'car',
        y: 2,
      },
      {
        x: 'moto',
        y: 282,
      },
      {
        x: 'bicycle',
        y: 77,
      },
      {
        x: 'horse',
        y: 35,
      },
      {
        x: 'skateboard',
        y: 193,
      },
      {
        x: 'others',
        y: 112,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(286, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 214,
      },
      {
        x: 'helicopter',
        y: 128,
      },
      {
        x: 'boat',
        y: 262,
      },
      {
        x: 'train',
        y: 266,
      },
      {
        x: 'subway',
        y: 75,
      },
      {
        x: 'bus',
        y: 66,
      },
      {
        x: 'car',
        y: 173,
      },
      {
        x: 'moto',
        y: 4,
      },
      {
        x: 'bicycle',
        y: 219,
      },
      {
        x: 'horse',
        y: 161,
      },
      {
        x: 'skateboard',
        y: 201,
      },
      {
        x: 'others',
        y: 78,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(245, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 117,
      },
      {
        x: 'helicopter',
        y: 88,
      },
      {
        x: 'boat',
        y: 179,
      },
      {
        x: 'train',
        y: 13,
      },
      {
        x: 'subway',
        y: 213,
      },
      {
        x: 'bus',
        y: 241,
      },
      {
        x: 'car',
        y: 118,
      },
      {
        x: 'moto',
        y: 159,
      },
      {
        x: 'bicycle',
        y: 227,
      },
      {
        x: 'horse',
        y: 134,
      },
      {
        x: 'skateboard',
        y: 107,
      },
      {
        x: 'others',
        y: 231,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(185, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 209,
      },
      {
        x: 'helicopter',
        y: 233,
      },
      {
        x: 'boat',
        y: 184,
      },
      {
        x: 'train',
        y: 137,
      },
      {
        x: 'subway',
        y: 56,
      },
      {
        x: 'bus',
        y: 158,
      },
      {
        x: 'car',
        y: 78,
      },
      {
        x: 'moto',
        y: 249,
      },
      {
        x: 'bicycle',
        y: 218,
      },
      {
        x: 'horse',
        y: 210,
      },
      {
        x: 'skateboard',
        y: 261,
      },
      {
        x: 'others',
        y: 288,
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
