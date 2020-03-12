import { fromTokenBaseUnit } from '~/utils/fromTokenBaseUnit';
import { fromUnixTime, format} from 'date-fns';

const jsonData = [
  {
    calculationsHistory: [
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
    ],
    name: 'AF MTC 4',
  },
  {
    calculationsHistory: [
      {
        sharePrice: '1336059701807781751',
        timestamp: '1583741185',
        validPrices: true,
      },
      {
        sharePrice: '1251023708072563936',
        timestamp: '1583676639',
        validPrices: true,
      },
      {
        sharePrice: '1181199247032517276',
        timestamp: '1583585773',
        validPrices: true,
      },
      {
        sharePrice: '1210502837016324683',
        timestamp: '1583521838',
        validPrices: true,
      },
      {
        sharePrice: '1209739412236262425',
        timestamp: '1583520841',
        validPrices: true,
      },
      {
        sharePrice: '1210982119692212145',
        timestamp: '1583519114',
        validPrices: true,
      },
      {
        sharePrice: '1210982125721101814',
        timestamp: '1583519098',
        validPrices: true,
      },
      {
        sharePrice: '1216848437935391733',
        timestamp: '1583483478',
        validPrices: true,
      },
      {
        sharePrice: '1247223694563029695',
        timestamp: '1583397898',
        validPrices: true,
      },
      {
        sharePrice: '1270109642928830556',
        timestamp: '1583312357',
        validPrices: true,
      },
      {
        sharePrice: '1257632644799076207',
        timestamp: '1583226834',
        validPrices: true,
      },
      {
        sharePrice: '1256546365450791334',
        timestamp: '1583141313',
        validPrices: true,
      },
      {
        sharePrice: '1255012719967292493',
        timestamp: '1583054001',
        validPrices: true,
      },
      {
        sharePrice: '1201002458021264388',
        timestamp: '1582966666',
        validPrices: true,
      },
      {
        sharePrice: '1218363298202437481',
        timestamp: '1582879322',
        validPrices: true,
      },
      {
        sharePrice: '1203701914111745250',
        timestamp: '1582791986',
        validPrices: true,
      },
      {
        sharePrice: '1171467394245499515',
        timestamp: '1582706461',
        validPrices: true,
      },
      {
        sharePrice: '1091398054617580322',
        timestamp: '1582637426',
        validPrices: true,
      },
      {
        sharePrice: '1091387739531606737',
        timestamp: '1582620311',
        validPrices: true,
      },
      {
        sharePrice: '1091368882609538982',
        timestamp: '1582620160',
        validPrices: true,
      },
      {
        sharePrice: '1091368894269353043',
        timestamp: '1582620126',
        validPrices: true,
      },
      {
        sharePrice: '1078897740457614817',
        timestamp: '1582591183',
        validPrices: true,
      },
      {
        sharePrice: '1058087258683469433',
        timestamp: '1582547600',
        validPrices: true,
      },
      {
        sharePrice: '1070217502728177430',
        timestamp: '1582460198',
        validPrices: true,
      },
      {
        sharePrice: '1079865703102223524',
        timestamp: '1582372882',
        validPrices: true,
      },
      {
        sharePrice: '1068752430635651077',
        timestamp: '1582281970',
        validPrices: true,
      },
      {
        sharePrice: '1077906780956971521',
        timestamp: '1582244889',
        validPrices: true,
      },
      {
        sharePrice: '1045784906521199884',
        timestamp: '1582157578',
        validPrices: true,
      },
      {
        sharePrice: '970955430970077097',
        timestamp: '1582115544',
        validPrices: true,
      },
      {
        sharePrice: '977542595825848645',
        timestamp: '1582111692',
        validPrices: true,
      },
    ],
    name: 'Flash Boys 3.0',
  },
  {
    calculationsHistory: [
      {
        sharePrice: '1302504261318962670',
        timestamp: '1583741185',
        validPrices: false,
      },
      {
        sharePrice: '1285738512359202319',
        timestamp: '1583676639',
        validPrices: false,
      },
      {
        sharePrice: '1287618128346150365',
        timestamp: '1583585773',
        validPrices: false,
      },
      {
        sharePrice: '1285199286423395341',
        timestamp: '1583521838',
        validPrices: false,
      },
      {
        sharePrice: '1286776054638481205',
        timestamp: '1583520841',
        validPrices: false,
      },
      {
        sharePrice: '1285477737979416153',
        timestamp: '1583519114',
        validPrices: false,
      },
      {
        sharePrice: '1285477744347252438',
        timestamp: '1583519098',
        validPrices: false,
      },
      {
        sharePrice: '1280552253876689147',
        timestamp: '1583483478',
        validPrices: false,
      },
      {
        sharePrice: '1304373926112976662',
        timestamp: '1583397898',
        validPrices: false,
      },
      {
        sharePrice: '1318295046026785259',
        timestamp: '1583312357',
        validPrices: false,
      },
      {
        sharePrice: '1284186593698623021',
        timestamp: '1583226834',
        validPrices: false,
      },
      {
        sharePrice: '1235447501379825767',
        timestamp: '1583141313',
        validPrices: false,
      },
      {
        sharePrice: '1245169119849720399',
        timestamp: '1583054001',
        validPrices: false,
      },
      {
        sharePrice: '1149072529280546000',
        timestamp: '1582966666',
        validPrices: false,
      },
      {
        sharePrice: '1140944461068476426',
        timestamp: '1582879322',
        validPrices: false,
      },
      {
        sharePrice: '1116177992057029219',
        timestamp: '1582791986',
        validPrices: false,
      },
      {
        sharePrice: '1082666465582037641',
        timestamp: '1582706461',
        validPrices: false,
      },
      {
        sharePrice: '1082206625201060889',
        timestamp: '1582620311',
        validPrices: false,
      },
      {
        sharePrice: '1081927594688997748',
        timestamp: '1582620160',
        validPrices: false,
      },
      {
        sharePrice: '1082006980107752143',
        timestamp: '1582620126',
        validPrices: false,
      },
      {
        sharePrice: '1096071301346673039',
        timestamp: '1582591183',
        validPrices: false,
      },
      {
        sharePrice: '1105741659661532735',
        timestamp: '1582547600',
        validPrices: false,
      },
      {
        sharePrice: '1114826720700996054',
        timestamp: '1582460198',
        validPrices: false,
      },
      {
        sharePrice: '1099159281424183968',
        timestamp: '1582372882',
        validPrices: false,
      },
      {
        sharePrice: '1068049205066328592',
        timestamp: '1582281970',
        validPrices: false,
      },
      {
        sharePrice: '1054769811042087738',
        timestamp: '1582244889',
        validPrices: false,
      },
      {
        sharePrice: '1021252046752493927',
        timestamp: '1582157578',
        validPrices: true,
      },
      {
        sharePrice: '997017080076689687',
        timestamp: '1582086024',
        validPrices: true,
      },
      {
        sharePrice: '995472142286284164',
        timestamp: '1582075347',
        validPrices: true,
      },
      {
        sharePrice: '995955955067801565',
        timestamp: '1582070168',
        validPrices: true,
      },
    ],
    name: 'NewFund',
  },
];

export const formattedData = jsonData.map(fund => {
  return {
    name: fund.name,
    prices: fund.calculationsHistory.map(price => {
      return {
        price: fromTokenBaseUnit(price.sharePrice, 8),
        timestamp: format(fromUnixTime(parseInt(price.timestamp)), 'dLLLyy'),
      };
    }),
  };
});
