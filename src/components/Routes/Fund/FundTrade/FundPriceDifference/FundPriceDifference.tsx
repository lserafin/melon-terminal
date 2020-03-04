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
  const context = useFund()!;
  const [query, data] = useAssetLastPriceUpdateQuery(queryParams);
  const [policyManager, policyQuery] = useFundPoliciesQuery(context.address);

  if (query.loading || policyQuery.loading) {
    return <div> nothing to see here </div>;
  }

  const lastPrice = data && data[taker.symbol].dividedBy(data[maker.symbol]);

  const priceTolerancePolicy = policyManager.policies?.filter(policy => policy.identifier === 'PriceTolerance');

  const priceTolerance =
    priceTolerancePolicy && priceTolerancePolicy.length > 0
      ? priceTolerancePolicy[0].priceTolerance.dividedBy('1e16')
      : new BigNumber('Nan');

  const difference = lastPrice && calculateReturn(price, lastPrice);
  const validate = difference?.isGreaterThan(priceTolerance)

  return <FormattedNumber value={difference} colorize={true} suffix="%" />;
};
