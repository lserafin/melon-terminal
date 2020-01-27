import React from 'react';
import { Spinner } from '~/storybook/components/Spinner/Spinner';
import {
  useFundPoliciesQuery,
  MaxConcentrationPolicy,
  MaxPositionsPolicy,
  PriceTolerancePolicy,
  FundPolicy,
  AssetWhitelistPolicy,
  AssetBlacklistPolicy,
} from '~/queries/FundPolicies';
import { useEnvironment } from '~/hooks/useEnvironment';
import {
  ScrollableTable,
  Table,
  HeaderCell,
  HeaderRow,
  BodyCell,
  BodyRow,
  NoEntries,
} from '~/storybook/components/Table/Table';
import { MaxConcentration } from './MaxConcentration/MaxConcentration';
import { CustomPolicy } from './CustomPolicy/CustomPolicy';
import { MaxPositions } from './MaxPositions/MaxPositions';
import { PriceTolerance } from './PriceTolerance/PriceTolerance';
import { AssetWhitelist } from './AssetWhitelist/AssetWhitelist';
import { AssetBlacklist } from './AssetBlacklist/AssetBlacklist';
import { UserWhitelist } from './UserWhitelist/UserWhitelist';
import { DeployedEnvironment } from '@melonproject/melonjs';
import { SectionTitle } from '~/storybook/components/Title/Title';
import { Block } from '~/storybook/components/Block/Block';

export interface FundPoliciesParametersProps {
  policy: FundPolicy;
  environment: DeployedEnvironment;
}

export const FundPoliciesParameters: React.FC<FundPoliciesParametersProps> = props => {
  switch (props.policy.type) {
    case 'MaxConcentration': {
      return <MaxConcentration policy={props.policy as MaxConcentrationPolicy} />;
    }

    case 'MaxPositions': {
      return <MaxPositions policy={props.policy as MaxPositionsPolicy} />;
    }

    case 'PriceTolerance': {
      return <PriceTolerance policy={props.policy as PriceTolerancePolicy} />;
    }

    case 'AssetWhitelist': {
      return <AssetWhitelist policy={props.policy as AssetWhitelistPolicy} environment={props.environment} />;
    }

    case 'AssetBlacklist': {
      return <AssetBlacklist policy={props.policy as AssetBlacklistPolicy} environment={props.environment} />;
    }

    case 'UserWhitelist': {
      return <UserWhitelist />;
    }

    case 'CustomPolicy': {
      return <CustomPolicy />;
    }

    default: {
      return <BodyCell>Unknown</BodyCell>;
    }
  }
};

export interface FundPoliciesProps {
  address: string;
}

export const FundPolicies: React.FC<FundPoliciesProps> = ({ address }) => {
  const environment = useEnvironment()!;
  const [policyManager, query] = useFundPoliciesQuery(address);

  if (query.loading) {
    return (
      <Block>
        <SectionTitle>Fund ruleset</SectionTitle>
        <Spinner />
      </Block>
    );
  }

  const policies = policyManager && policyManager.policies;

  return (
    <Block>
      <SectionTitle>Fund ruleset</SectionTitle>
      {policies && policies.length ? (
        <ScrollableTable>
          <Table>
            <thead>
              <HeaderRow>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Parameter(s)</HeaderCell>
              </HeaderRow>
            </thead>
            <tbody>
              {policies.map(policy => (
                <BodyRow key={policy.address}>
                  <BodyCell>{policy.identifier}</BodyCell>
                  <FundPoliciesParameters policy={policy} environment={environment} />
                </BodyRow>
              ))}
            </tbody>
          </Table>
        </ScrollableTable>
      ) : (
        <NoEntries>No fund rules registered.</NoEntries>
      )}
    </Block>
  );
};

export default FundPolicies;
