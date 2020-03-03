import React from 'react';
import { useAssetLastPriceUpdateQuery } from './FundPriceDifferenceQuery';
import { TokenDefinition } from '@melonproject/melonjs';
import BigNumber from 'bignumber.js';
import { FormattedNumber } from '~/components/Common/FormattedNumber/FormattedNumber';
import { calculateReturn } from '~/utils/finance';
import { useFund } from '~/hooks/useFund';
import { useFundPoliciesQuery } from '../../FundRiskProfile/FundRegisterPolicies/FundPolicies.query';

export interface AssetPriceDifferenceProps {
  maker: TokenDefinition;
  taker: TokenDefinition;
  price: BigNumber;
}

export const AssetPriceDifference: React.FC<AssetPriceDifferenceProps> = ({ maker, taker, price }) => {
  const queryParams = [maker, taker];
  const context = useFund();
  const [query, data] = useAssetLastPriceUpdateQuery(queryParams);
  const [policyManager, policyQuery] = useFundPoliciesQuery(context?.address);

  if (query.loading || policyQuery.loading) {
    return <div> nothing to see here </div>;
  }
  // if ETH doesn't exist in the pair, then you need to divide the taker price by the maker price
  // if ETH does exist in the pair
  // if eth is the maker, last price is price returned with decimals adjusted
  // if eth is the taker, last price is 1 divided by price returned with decimals adjusted

  const lastPrice = data && data[taker.symbol].dividedBy(data[maker.symbol]);

  const priceTolerancePolicy = policyManager.policies?.filter(policy => policy.identifier === 'PriceTolerance');

  const priceTolerance =
    priceTolerancePolicy && priceTolerancePolicy.length > 0
      ? priceTolerancePolicy[0].priceTolerance.dividedBy('1e16')
      : undefined;
  const oneDayReturn = calculateReturn(price, lastPrice);
  // if the maker symbol is WETH, last price is the same denomination as current price
  // if the maker symbol is not WETH, last price is denominated in WETH and needs to be flipped to 1/lastPrice
  // find the difference in prices - use contract logic?
  // find price tolerance contract setting
  // if difference > tolerance, show it in red or something, change render
  // otherwise return
  // 150000000000000000
  return <FormattedNumber value={oneDayReturn} colorize={true} suffix="%" />;
};
