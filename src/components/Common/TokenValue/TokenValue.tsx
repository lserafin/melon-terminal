import React from 'react';
import BigNumber from 'bignumber.js';
import { FormattedNumber } from '../FormattedNumber/FormattedNumber';

export interface TokenValueProps {
  value?: BigNumber.Value;
  symbol?: string;
  decimals?: number;
  digits?: number;
  tooltipDigits?: number;
}

export const TokenValue: React.FC<TokenValueProps> = ({
  value,
  symbol = '',
  decimals = 18,
  digits = 4,
  tooltipDigits = 18,
}) => {
  const bn = BigNumber.isBigNumber(value) ? value : new BigNumber(value ?? 'NaN');
  return (
    <FormattedNumber
      tooltip={true}
      value={bn.dividedBy(new BigNumber(10).exponentiatedBy(decimals))}
      suffix={symbol}
      decimals={digits}
      tooltipDecimals={tooltipDigits}
    />
  );
};
