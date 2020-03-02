import BigNumber from 'bignumber.js';
import gql from 'graphql-tag';
import { useTheGraphQuery } from '~/hooks/useQuery';
import { TokenDefinition } from '@melonproject/melonjs';

const AssetLastPriceUpdateQuery = gql`
  query AssetLastPriceUpdateQuery($id: String!) {
    asset(id: $id) {
      lastPriceUpdate
    }
  }
`;

export interface AssetLastPriceUpdateQueryVariables {
  id: string;
}

export interface AssetLastPriceUpdateQueryResult {
  asset: {
    lastPriceUpdate: BigNumber;
  };
}

export const useAssetLastPriceUpdateQuery = (token: TokenDefinition) => {
  const id = token.address.toLowerCase();
  const options = {
    variables: {
      id,
    },
  };
  const result = useTheGraphQuery<AssetLastPriceUpdateQueryResult, AssetLastPriceUpdateQueryVariables>(
    AssetLastPriceUpdateQuery,
    options
  );
  if (!result.loading) {
    console.log(result.data);
  }
  const data = result.data && new BigNumber(result.data.asset.lastPriceUpdate);
  return [result, data] as [typeof result, data];
};
