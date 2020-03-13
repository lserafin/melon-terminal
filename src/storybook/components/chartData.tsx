import { fromTokenBaseUnit } from '~/utils/fromTokenBaseUnit';
import { fromUnixTime, format } from 'date-fns';
import { toTokenBaseUnit } from '~/utils/toTokenBaseUnit';
import { calculateReturn } from '~/utils/finance';



const assetPrices = [
  {
    name: 'Wrapped BTC',
    priceHistory: [
      {
        price: '38442108316238518623',
        timestamp: '1581897328',
      },
      {
        price: '36634052763117770197',
        timestamp: '1581982860',
      },
      {
        price: '36035949462379470476',
        timestamp: '1582070168',
      },
      {
        price: '36918448252420002515',
        timestamp: '1582157578',
      },
      {
        price: '37302649148073942430',
        timestamp: '1582244889',
      },
      {
        price: '37108726955558769113',
        timestamp: '1582281970',
      },
      {
        price: '36766203262140336972',
        timestamp: '1582372882',
      },
      {
        price: '36535935547782749406',
        timestamp: '1582460198',
      },
      {
        price: '36217593135730524084',
        timestamp: '1582547600',
      },
      {
        price: '36485870483536269137',
        timestamp: '1582591183',
      },
      {
        price: '36934605226867063509',
        timestamp: '1582620126',
      },
      {
        price: '36934605226867063509',
        timestamp: '1582620160',
      },
      {
        price: '36953214196501804698',
        timestamp: '1582620311',
      },
      {
        price: '38483577001396286601',
        timestamp: '1582706461',
      },
      {
        price: '38733317263793034400',
        timestamp: '1582791986',
      },
      {
        price: '38847953294350509170',
        timestamp: '1582879322',
      },
      {
        price: '38202269928204262169',
        timestamp: '1582966666',
      },
      {
        price: '38777217378553693363',
        timestamp: '1583054001',
      },
      {
        price: '39154426663347430732',
        timestamp: '1583141313',
      },
      {
        price: '38680641507306276127',
        timestamp: '1583226834',
      },
      {
        price: '38956091030318530245',
        timestamp: '1583312357',
      },
      {
        price: '38960766824354848457',
        timestamp: '1583397898',
      },
      {
        price: '38722544027930364244',
        timestamp: '1583483478',
      },
      {
        price: '38261072367733772701',
        timestamp: '1583519098',
      },
      {
        price: '38261072367733772701',
        timestamp: '1583519114',
      },
      {
        price: '38205088551557489392',
        timestamp: '1583520841',
      },
      {
        price: '38254274606121887948',
        timestamp: '1583521838',
      },
      {
        price: '37134807520605964419',
        timestamp: '1583585773',
      },
      {
        price: '38412241387484365996',
        timestamp: '1583676639',
      },
      {
        price: '39436488525296030285',
        timestamp: '1583741185',
      },
    ],
  },
  {
    name: 'Multi-Collateral Dai',
    priceHistory: [
      {
        price: '3799257779175368',
        timestamp: '1581897328',
      },
      {
        price: '3762400510843808',
        timestamp: '1581982860',
      },
      {
        price: '3534691817283398',
        timestamp: '1582070168',
      },
      {
        price: '3844101139421565',
        timestamp: '1582157578',
      },
      {
        price: '3900665166130502',
        timestamp: '1582244889',
      },
      {
        price: '3829165332561576',
        timestamp: '1582281970',
      },
      {
        price: '3820199784694252',
        timestamp: '1582372882',
      },
      {
        price: '3705012953736594',
        timestamp: '1582460198',
      },
      {
        price: '3678686738188178',
        timestamp: '1582547600',
      },
      {
        price: '3793814977017550',
        timestamp: '1582591183',
      },
      {
        price: '3862574309433285',
        timestamp: '1582620126',
      },
      {
        price: '3862574309433285',
        timestamp: '1582620160',
      },
      {
        price: '3862665743439904',
        timestamp: '1582620311',
      },
      {
        price: '4260167668793623',
        timestamp: '1582706461',
      },
      {
        price: '4391915157155075',
        timestamp: '1582791986',
      },
      {
        price: '4468026466362062',
        timestamp: '1582879322',
      },
      {
        price: '4406378735609623',
        timestamp: '1582966666',
      },
      {
        price: '4570555084794652',
        timestamp: '1583054001',
      },
      {
        price: '4548016443793555',
        timestamp: '1583141313',
      },
      {
        price: '4415274231637969',
        timestamp: '1583226834',
      },
      {
        price: '4427708282324972',
        timestamp: '1583312357',
      },
      {
        price: '4393156168597222',
        timestamp: '1583397898',
      },
      {
        price: '4261285826410931',
        timestamp: '1583483478',
      },
      {
        price: '4218985344840242',
        timestamp: '1583519098',
      },
      {
        price: '4218985344840242',
        timestamp: '1583519114',
      },
      {
        price: '4208604108317013',
        timestamp: '1583520841',
      },
      {
        price: '4213228501487494',
        timestamp: '1583521838',
      },
      {
        price: '4091636566527067',
        timestamp: '1583585773',
      },
      {
        price: '4441162198628110',
        timestamp: '1583676639',
      },
      {
        price: '4855169137497771',
        timestamp: '1583741185',
      },
    ],
  },
  {
    name: 'Melon Token',
    priceHistory: [
      {
        price: '22384410289239250',
        timestamp: '1581897328',
      },
      {
        price: '21072828239583407',
        timestamp: '1581982860',
      },
      {
        price: '20685334469981525',
        timestamp: '1582070168',
      },
      {
        price: '19394654127988359',
        timestamp: '1582157578',
      },
      {
        price: '19811401861191069',
        timestamp: '1582244889',
      },
      {
        price: '19441946751242957',
        timestamp: '1582281970',
      },
      {
        price: '20161837136194371',
        timestamp: '1582372882',
      },
      {
        price: '19421249905039759',
        timestamp: '1582460198',
      },
      {
        price: '19473338957390458',
        timestamp: '1582547600',
      },
      {
        price: '18313400742881042',
        timestamp: '1582591183',
      },
      {
        price: '17954693267385410',
        timestamp: '1582620126',
      },
      {
        price: '17954693267385410',
        timestamp: '1582620160',
      },
      {
        price: '17954693267385410',
        timestamp: '1582620311',
      },
      {
        price: '20188962120378771',
        timestamp: '1582706461',
      },
      {
        price: '18639045703132262',
        timestamp: '1582791986',
      },
      {
        price: '18030861217064215',
        timestamp: '1582879322',
      },
      {
        price: '18409967107833223',
        timestamp: '1582966666',
      },
      {
        price: '19120225921695087',
        timestamp: '1583054001',
      },
      {
        price: '18769895671658714',
        timestamp: '1583141313',
      },
      {
        price: '18353179516551484',
        timestamp: '1583226834',
      },
      {
        price: '19135909096235856',
        timestamp: '1583312357',
      },
      {
        price: '19396407465817189',
        timestamp: '1583397898',
      },
      {
        price: '19034716191509828',
        timestamp: '1583483478',
      },
      {
        price: '19099528845377265',
        timestamp: '1583519098',
      },
      {
        price: '19099528845377265',
        timestamp: '1583519114',
      },
      {
        price: '19099528845377265',
        timestamp: '1583520841',
      },
      {
        price: '19103955968535646',
        timestamp: '1583521838',
      },
      {
        price: '19799123432289777',
        timestamp: '1583585773',
      },
      {
        price: '19489922260667411',
        timestamp: '1583676639',
      },
      {
        price: '19672016794953908',
        timestamp: '1583741185',
      },
    ],
  },
];

const fundData = [
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
];

const formattedFundData = fundData.map(fund => {
  const dayZeroPrice = fromTokenBaseUnit(fund.calculationsHistory[0].sharePrice, 8)

  return {
    name: fund.name,
    data: fund.calculationsHistory.map(price => {
      return [format(fromUnixTime(parseInt(price.timestamp)), 'dMMMyy' ), calculateReturn(fromTokenBaseUnit(price.sharePrice, 8), dayZeroPrice).toNumber()];
    }),
  };
});

const formattedAssetData = assetPrices.map(asset => {
  const dayZeroPrice = fromTokenBaseUnit(asset.priceHistory[0].price, 8)
  return {
    name: asset.name,
    data: asset.priceHistory.map(price => {
      return [format(fromUnixTime(parseInt(price.timestamp)), 'dMMMyy'), calculateReturn(fromTokenBaseUnit(price.price, 8), dayZeroPrice).toNumber()];
    }),
  };
});

export const formattedData = formattedAssetData.concat(formattedFundData)
