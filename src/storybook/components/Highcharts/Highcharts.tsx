import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {formattedData} from '../chartData'

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

const options = {
  chart: {
    type: 'spline',
  },
  title: {
    text: 'My chart',
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6],
    },
  ],
};

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


export const Highchart = () => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
