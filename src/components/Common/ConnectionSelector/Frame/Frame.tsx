import React from 'react';
import * as Rx from 'rxjs';
import * as R from 'ramda';
import { Eth } from 'web3-eth';
import { HttpProvider } from 'web3-providers';
import {
  ConnectionMethod,
  ConnectionAction,
  networkChanged,
  accountsChanged,
  connectionEstablished,
} from '~/components/Contexts/Connection/Connection';
import {
  map,
  expand,
  concatMap,
  retryWhen,
  delay,
  take,
  distinctUntilChanged,
  share,
  skip,
  catchError,
} from 'rxjs/operators';
import { networkFromId } from '~/utils/networkFromId';
import { SubmitButton } from '~/components/Common/Form/SubmitButton/SubmitButton';

interface EthResource extends Rx.Unsubscribable {
  eth: Eth;
}

const connect = (): Rx.Observable<ConnectionAction> => {
  const create = (): EthResource => {
    const provider = new HttpProvider('http://localhost:1248');
    const eth = new Eth(provider, undefined, {
      transactionConfirmationBlocks: 1,
    });

    return { eth, unsubscribe: () => provider.disconnect() };
  };

  return Rx.using(create, resource => {
    const eth = (resource as EthResource).eth;
    const connect$ = Rx.defer(async () => {
      const [id, accounts] = await Promise.all([eth.net.getId(), eth.getAccounts().catch(() => [])]);
      const network = networkFromId(id);
      return [network, accounts] as [typeof network, typeof accounts];
    }).pipe(
      retryWhen(error => error.pipe(delay(1000))),
      take(1),
      share()
    );

    const enable$ = connect$.pipe(map(([network, accounts]) => connectionEstablished(eth, network, accounts)));

    const accounts$ = connect$.pipe(
      map(([, accounts]) => accounts),
      expand(() =>
        Rx.timer(1000).pipe(
          concatMap(() => eth.getAccounts()),
          catchError(() => Rx.of([]))
        )
      ),
      distinctUntilChanged((a, b) => R.equals(a, b)),
      map(accounts => accountsChanged(accounts)),
      skip(1)
    );

    const network$ = connect$.pipe(
      map(([network]) => network),
      expand(() =>
        Rx.timer(1000).pipe(
          concatMap(() => eth.net.getId()),
          map(id => networkFromId(id)),
          catchError(() => Rx.of(undefined))
        )
      ),
      distinctUntilChanged((a, b) => R.equals(a, b)),
      map(network => networkChanged(network)),
      skip(1)
    );

    return Rx.concat(enable$, Rx.merge(network$, accounts$));
  });
};

export const Frame: React.FC<any> = ({ select, active }) => {
  return (
    <div>
      <h2>Frame</h2>
      {!active ? <SubmitButton onClick={() => select()} label="Connect" /> : <div>Currently selected</div>}
    </div>
  );
};

export const method: ConnectionMethod = {
  connect,
  component: Frame,
  name: 'Frame',
};
