import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';
import { useFundExistsQuery } from '~/queries/FundExists';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import { FundHeader } from './FundHeader/FundHeader';
import { FundNavigation } from './FundNavigation/FundNavigation';
import * as S from './Fund.styles';

const NoMatch = React.lazy(() => import('~/components/Routes/NoMatch/NoMatch'));
const FundRedeem = React.lazy(() => import('./FundRoutes/FundRedeem/FundRedeem'));
const FundDetails = React.lazy(() => import('./FundRoutes/FundDetails/FundDetails'));
const FundClaimFees = React.lazy(() => import('./FundRoutes/FundClaimFees/FundClaimFees'));
const FundShutdown = React.lazy(() => import('./FundRoutes/FundShutdown/FundShutdown'));

export interface FundRouteParams {
  address: string;
}

export const Fund: React.FC = () => {
  const match = useRouteMatch<FundRouteParams>()!;
  const [exists, query] = useFundExistsQuery(match.params.address);
  if (query.loading) {
    return <Spinner positioning="centered" />;
  }

  if (!exists) {
    return (
      <S.FundNotFound>
        <h1>Fund not found</h1>
        <p>The given address {match.params.address} is invalid or is not a fund.</p>
      </S.FundNotFound>
    );
  }

  return (
    <>
      <S.FundHeader>
        <FundHeader address={match.params.address} />
      </S.FundHeader>
      <S.FundNavigation>
        <FundNavigation address={match.params.address} />
      </S.FundNavigation>
      <S.FundBody>
        <Switch>
          <Route path={match.path} exact={true}>
            <FundDetails address={match.params.address} />
          </Route>
          <Route path={`${match.path}/redeem`} exact={true}>
            <FundRedeem address={match.params.address} />
          </Route>
          <Route path={`${match.path}/claimfees`} exact={true}>
            <FundClaimFees address={match.params.address} />
          </Route>
          <Route path={`${match.path}/shutdown`} exact={true}>
            <FundShutdown address={match.params.address} />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </S.FundBody>
    </>
  );
};

export default Fund;
