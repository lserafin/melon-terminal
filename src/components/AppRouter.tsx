import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { OnChainApollo, TheGraphApollo } from './Contexts/Apollo/Apollo';
import { RequiresAccount } from './Common/Gates/RequiresAccount/RequiresAccount';
import { RequiresConnection } from './Common/Gates/RequiresConnection/RequiresConnection';
import { ConnectionSelector } from './Common/ConnectionSelector/ConnectionSelector';

const Home = React.lazy(() => import('./Routes/Home/Home'));
const Wallet = React.lazy(() => import('./Routes/Wallet/Wallet'));
const Fund = React.lazy(() => import('./Routes/Fund/Fund'));
const Connect = React.lazy(() => import('./Routes/Connect/Connect'));
const Playground = React.lazy(() => import('./Routes/Playground/Playground'));
const NoMatch = React.lazy(() => import('./Routes/NoMatch/NoMatch'));

export const AppRouter = () => (
  <>
    <Switch>
      <Route path="/" exact={true}>
        <RequiresConnection fallback={<ConnectionSelector />}>
          <Home />
        </RequiresConnection>
      </Route>
      <Route path="/connect" exact={true}>
        <Connect />
      </Route>
      <Route path="/wallet">
        <RequiresAccount fallback={<ConnectionSelector />}>
          <Wallet />
        </RequiresAccount>
      </Route>
      <Route path="/fund/:address">
        <RequiresConnection fallback={<ConnectionSelector />}>
          <Fund />
        </RequiresConnection>
      </Route>
      <Route path="/playground/onchain" exact={true}>
        <RequiresConnection fallback={<ConnectionSelector />}>
          <Playground context={OnChainApollo} bucket="onchain" />
        </RequiresConnection>
      </Route>
      <Route path="/playground/thegraph" exact={true}>
        <RequiresConnection fallback={<ConnectionSelector />}>
          <Playground context={TheGraphApollo} bucket="thegraph" />
        </RequiresConnection>
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
  </>
);
