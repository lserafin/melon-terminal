import React from 'react';
import { useAssetLastPriceUpdateQuery } from './FundPriceDifferenceQuery';
import { TokenDefinition } from '@melonproject/melonjs';
import BigNumber from 'bignumber.js';
import { FormattedNumber } from '~/components/Common/FormattedNumber/FormattedNumber';

export interface AssetPriceDifferenceProps {
  maker: TokenDefinition;
  taker: TokenDefinition;
  price: BigNumber;
}

export const AssetPriceDifference: React.FC<AssetPriceDifferenceProps> = ({ maker, taker, price }) => {
  const querySymbol = maker.symbol === 'WETH' ? taker : maker;

  const [query, data] = useAssetLastPriceUpdateQuery(querySymbol);

  if (query.loading) {
    return <div> nothing to see here </div>;
  }

  console.log(typeof data);

  // if the maker symbol is WETH, last price is the same denomination as current price  
  // if the maker symbol is not WETH, last price is denominated in WETH and needs to be flipped to 1/lastPrice
  // find the difference in prices - use contract logic?
  // find price tolerance contract setting 
  // if difference > tolerance, show it in red or something, change render
  // otherwise return
  const difference = price.minus(data);
  return <FormattedNumber value={difference} />;
};
