import BigNumber from 'bignumber.js';
import gql from 'graphql-tag';
import { useTheGraphQuery } from '~/hooks/useQuery';
import { TokenDefinition } from '@melonproject/melonjs';

const AssetLastPriceUpdateQuery = gql`
  query AssetLastPriceUpdateQuery($symbols: [String!]!) {
    assets(where: { symbol_in: $symbols }) {
      symbol
      lastPrice
    }
  }
`;

export interface AssetLastPriceUpdateQueryVariables {
  symbols: string[];
}

export interface AssetPriceObject {
  lastPrice: BigNumber;
  symbol: string;
}

export interface AssetLastPriceUpdateQueryResult {
  assets: AssetPriceObject[];
}

export interface LastPriceReturnObject {
  [symbol: string]: BigNumber;
}

export const useAssetLastPriceUpdateQuery = (tokens: TokenDefinition[]) => {
  const symbols = tokens.map(token => token.symbol);

  const options = {
    variables: {
      symbols,
    },
  };
  const result = useTheGraphQuery<AssetLastPriceUpdateQueryResult, AssetLastPriceUpdateQueryVariables>(
    AssetLastPriceUpdateQuery,
    options
  );
  if (!result.loading) {
  }

  const data = result.data && assembleLastPriceObject(result.data.assets);

  return [result, data] as [typeof result, typeof data];
};

function assembleLastPriceObject(input: AssetPriceObject[]): LastPriceReturnObject {
  const returnObject = input.reduce((carry, asset) => {
    return { ...carry, [asset.symbol]: new BigNumber(asset.lastPrice) };
  }, {});
  return returnObject as LastPriceReturnObject;
}
