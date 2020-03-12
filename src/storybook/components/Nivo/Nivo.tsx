import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import * as S from './Nivo.styles';
import { fromTokenBaseUnit } from '~/utils/fromTokenBaseUnit';
import { fromUnixTime } from 'date-fns';

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

const priceData = [
  {
    sharePrice: '1058822770630814829',
    timestamp: '1583741185',
    validPrices: true,
  },
  {
    sharePrice: '1026541607822709998',
    timestamp: '1583676639',
    validPrices: true,
  },
  {
    sharePrice: '995140255450816649',
    timestamp: '1583585773',
    validPrices: true,
  },
  {
    sharePrice: '1007308790289338605',
    timestamp: '1583521838',
    validPrices: true,
  },
  {
    sharePrice: '1006787244940103712',
    timestamp: '1583520841',
    validPrices: true,
  },
  {
    sharePrice: '1007092979203726251',
    timestamp: '1583519114',
    validPrices: true,
  },
  {
    sharePrice: '1007093030162609752',
    timestamp: '1583519098',
    validPrices: true,
  },
  {
    sharePrice: '1010910689120195310',
    timestamp: '1583483478',
    validPrices: true,
  },
  {
    sharePrice: '1022584194221790319',
    timestamp: '1583397898',
    validPrices: true,
  },
  {
    sharePrice: '1024741090128573049',
    timestamp: '1583312357',
    validPrices: true,
  },
  {
    sharePrice: '1023731594701118419',
    timestamp: '1583226834',
    validPrices: true,
  },
  {
    sharePrice: '1034215671867685554',
    timestamp: '1583141313',
    validPrices: true,
  },
  {
    sharePrice: '1036420897646887083',
    timestamp: '1583054001',
    validPrices: true,
  },
  {
    sharePrice: '1021845845141687798',
    timestamp: '1582966666',
    validPrices: true,
  },
  {
    sharePrice: '1027961570840031647',
    timestamp: '1582879322',
    validPrices: true,
  },
  {
    sharePrice: '1023333709270286332',
    timestamp: '1582791986',
    validPrices: true,
  },
  {
    sharePrice: '1012402836120173214',
    timestamp: '1582706461',
    validPrices: true,
  },
  {
    sharePrice: '971716992577889326',
    timestamp: '1582620311',
    validPrices: true,
  },
  {
    sharePrice: '971715358502117503',
    timestamp: '1582620160',
    validPrices: true,
  },
  {
    sharePrice: '971511444713619957',
    timestamp: '1582620126',
    validPrices: true,
  },
  {
    sharePrice: '962612310359145264',
    timestamp: '1582591183',
    validPrices: true,
  },
  {
    sharePrice: '949973378408326085',
    timestamp: '1582547600',
    validPrices: true,
  },
  {
    sharePrice: '952563062731845924',
    timestamp: '1582460198',
    validPrices: true,
  },
  {
    sharePrice: '967446453221041208',
    timestamp: '1582372882',
    validPrices: true,
  },
  {
    sharePrice: '968870841994925175',
    timestamp: '1582281970',
    validPrices: true,
  },
  {
    sharePrice: '977417000905196736',
    timestamp: '1582244889',
    validPrices: true,
  },
  {
    sharePrice: '970835259623909771',
    timestamp: '1582157578',
    validPrices: true,
  },
  {
    sharePrice: '933032556680672541',
    timestamp: '1582070168',
    validPrices: true,
  },
  {
    sharePrice: '961458374077518907',
    timestamp: '1581982860',
    validPrices: true,
  },
  {
    sharePrice: '965727930240710812',
    timestamp: '1581965474',
    validPrices: true,
  },
];

const formattedData = priceData.map(item => {
  return {
    price: fromTokenBaseUnit(item.sharePrice, 8),
    date: fromUnixTime(parseInt(item.timestamp)),
  };
});

/**
 * formattedData is an array of objects shaped like:
 * {
 *  price: BigNumber
 *  date: Mon Mar 09 2020 04:06:25 GMT-0400 (Eastern Daylight Time)
 * }
 */

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
