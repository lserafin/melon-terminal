import React, { Fragment } from 'react';
import { Spinner } from '~/storybook/components/Spinner/Spinner';
import { useFundDetailsQuery } from '~/queries/FundDetails';
import { SectionTitle } from '~/storybook/components/Title/Title';
import {
  Dictionary,
  DictionaryEntry,
  DictionaryData,
  DictionaryLabel,
} from '~/storybook/components/Dictionary/Dictionary';
import { EtherscanLink } from '~/components/Common/EtherscanLink/EtherscanLink';
import { FormattedNumber } from '~/components/Common/FormattedNumber/FormattedNumber';
import { FormattedDate } from '~/components/Common/FormattedDate/FormattedDate';
import { useEnvironment } from '~/hooks/useEnvironment';
import { useFundCalculationHistoryQuery } from '~/queries/FundCalculationHistory';
import BigNumber from 'bignumber.js';
import { standardDeviation } from '~/utils/finance';
import { useCurrency } from '~/hooks/useCurrency';

export interface NormalizedCalculation {
  sharePrice: BigNumber;
  dailyReturn: number;
  logReturn: number;
  timestamp: number;
}

export interface FundFactSheetProps {
  address: string;
}

export const FundFactSheet: React.FC<FundFactSheetProps> = ({ address }) => {
  const [fund, fundQuery] = useFundDetailsQuery(address);
  const environment = useEnvironment();
  const [calculations, calculationsQuery] = useFundCalculationHistoryQuery(address);

  if (!fundQuery || fundQuery.loading || !calculationsQuery || calculationsQuery.loading) {
    return (
      <Dictionary>
        <SectionTitle>Fund factsheet</SectionTitle>
        <Spinner />
      </Dictionary>
    );
  }

  if (!fund) {
    return null;
  }

  const routes = fund.routes;
  const creation = fund.creationTime;
  const accounting = routes?.accounting;
  const shares = routes?.shares;
  const version = routes?.version;
  const feeManager = routes?.feeManager;
  const managementFee = feeManager?.managementFee;
  const performanceFee = feeManager?.performanceFee;

  const initializeSeconds = (fund?.routes?.feeManager?.performanceFee?.initializeTime.getTime() || Date.now()) / 1000;
  const secondsNow = Date.now() / 1000;
  const secondsSinceInit = secondsNow - initializeSeconds;
  const performanceFeePeriodInSeconds = (performanceFee?.period || 1) * 24 * 60 * 60;
  const secondsSinceLastPeriod = secondsSinceInit % performanceFeePeriodInSeconds;
  const nextPeriodStart = secondsNow + (performanceFeePeriodInSeconds - secondsSinceLastPeriod);

  const normalizedCalculations = calculations.map((item, index, array) => {
    const returnSinceLastPriceUpdate =
      index > 0
        ? new BigNumber(item.sharePrice).dividedBy(new BigNumber(array[index - 1].sharePrice)).toNumber() - 1
        : 0;

    let dailyReturn = returnSinceLastPriceUpdate;
    if (dailyReturn > 100 || dailyReturn <= -1) {
      dailyReturn = 0;
    }

    return {
      sharePrice: item.sharePrice,
      dailyReturn: index > 0 ? dailyReturn * 100 : 0,
      logReturn: index > 0 ? Math.log(1 + dailyReturn) : 0,
      timestamp: new BigNumber(item.timestamp).toNumber(),
    };
  });

  const numbersLength = normalizedCalculations.length;
  const firstChange = (normalizedCalculations?.[0] || []) as NormalizedCalculation;
  const afterChange = (normalizedCalculations?.[numbersLength - 1] || []) as NormalizedCalculation;

  const returnSinceInception =
    firstChange && afterChange
      ? (new BigNumber(afterChange.sharePrice).dividedBy(new BigNumber(firstChange.sharePrice)).toNumber() - 1) * 100
      : null;

  const oneYear = 60 * 60 * 24 * 365.25;
  const annualizedReturn =
    returnSinceInception &&
    (Math.pow(1 + returnSinceInception / 100, oneYear / (afterChange.timestamp - firstChange.timestamp)) - 1) * 100;

  const creationTime = creation.getTime() || Date.now();
  const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const olderThanOneMonth = creationTime < oneMonthAgo;

  const volatility =
    normalizedCalculations &&
    standardDeviation(normalizedCalculations.map(item => item.logReturn)) * 100 * Math.sqrt(365.25);

  const exchanges = routes?.trading?.exchanges;
  const allowedAssets = routes?.participation?.allowedAssets;
  const allowedAssetsSymbols = allowedAssets?.map(asset => asset?.token?.symbol);

  return (
    <Dictionary>
      <SectionTitle>Fund factsheet</SectionTitle>
      <DictionaryEntry>
        <DictionaryLabel>Fund name</DictionaryLabel>
        <DictionaryData>{fund.name}</DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Protocol version</DictionaryLabel>
        <DictionaryData>{version?.name ? version.name : 'N/A'}</DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Fund address</DictionaryLabel>
        <DictionaryData>
          <EtherscanLink address={address} />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Manager address</DictionaryLabel>
        <DictionaryData>
          <EtherscanLink address={fund.manager} />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Inception</DictionaryLabel>
        <DictionaryData>{creation ? <FormattedDate timestamp={creation} /> : 'N/A'}</DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Status</DictionaryLabel>
        <DictionaryData>{fund.isShutDown ? 'Inactive' : 'Active'}</DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>&nbsp;</DictionaryLabel>
        <DictionaryData />
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Gross asset value (GAV)</DictionaryLabel>
        <DictionaryData>
          <FormattedNumber value={accounting?.grossAssetValue} suffix="WETH" />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Net asset value (NAV)</DictionaryLabel>
        <DictionaryData>
          <FormattedNumber value={accounting?.netAssetValue} suffix="WETH" />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Total number of shares</DictionaryLabel>
        <DictionaryData>
          <FormattedNumber value={shares?.totalSupply} />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Share price</DictionaryLabel>
        <DictionaryData>
          <FormattedNumber value={accounting?.sharePrice} suffix="WETH" />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>&nbsp;</DictionaryLabel>
        <DictionaryData />
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Management fee</DictionaryLabel>
        <DictionaryData>
          <FormattedNumber value={managementFee?.rate} decimals={0} suffix="%" />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Performance fee</DictionaryLabel>
        <DictionaryData>
          <FormattedNumber value={performanceFee?.rate} decimals={0} suffix="%" />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Performance fee period</DictionaryLabel>
        <DictionaryData>
          <FormattedNumber value={performanceFee?.period} decimals={0} suffix="days" />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Start of next performance fee period</DictionaryLabel>
        <DictionaryData>
          <FormattedDate timestamp={nextPeriodStart} />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>&nbsp;</DictionaryLabel>
        <DictionaryData />
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Return since inception</DictionaryLabel>
        <DictionaryData>
          <FormattedNumber value={returnSinceInception} colorize={true} decimals={2} suffix="%" />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Annualized return</DictionaryLabel>
        <DictionaryData>
          {olderThanOneMonth ? (
            <FormattedNumber value={annualizedReturn} colorize={true} decimals={2} suffix="%" />
          ) : (
            <>Too early to tell</>
          )}
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Annual volatility</DictionaryLabel>
        <DictionaryData>
          {olderThanOneMonth ? (
            <FormattedNumber value={volatility} colorize={false} decimals={2} suffix="%" />
          ) : (
            <>Too early to tell</>
          )}
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>&nbsp;</DictionaryLabel>
        <DictionaryData />
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Authorized exchanges</DictionaryLabel>
        <DictionaryData>
          {exchanges?.map((exchange, index) => {
            const item = environment?.getExchange(exchange.exchange!);

            return (
              <Fragment key={exchange.exchange}>
                <EtherscanLink key={index} inline={true} address={exchange.exchange}>
                  {item?.name ?? exchange.exchange}
                </EtherscanLink>
                {index + 1 < exchanges.length && ', '}
              </Fragment>
            );
          })}
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Investable assets</DictionaryLabel>
        <DictionaryData>{allowedAssetsSymbols ? allowedAssetsSymbols.sort().join(', ') : 'N/A'}</DictionaryData>
      </DictionaryEntry>
    </Dictionary>
  );
};
