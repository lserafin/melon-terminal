import React from 'react';
// @ts-ignore
import Fortmatic from 'fortmatic';
import { Eth } from 'web3-eth';
import { retryWhen, delay, switchMap, startWith, catchError } from 'rxjs/operators';
import * as Rx from 'rxjs';
import {
  connectionEstablished,
  ConnectionMethodProps,
  ConnectionMethod,
  connectionLost,
} from '~/components/Contexts/Connection/Connection';
import { SectionTitle } from '~/storybook/components/Title/Title';
import { Button } from '~/storybook/components/Button/Button.styles';
import { networkFromId } from '~/utils/networkFromId';
import { getConfig } from '~/config';
import { NetworkEnum } from '~/types';

interface Resource extends Rx.Unsubscribable {
  eth: Eth;
  provider: any;
}

const connect = () => {
  const create = () => {
    const config = getConfig(NetworkEnum.MAINNET)!;
    const fm = new Fortmatic(process.env.MELON_FORTMATIC_KEY, {
      rpcUrl: config.provider,
      chainId: 1,
    });

    const provider = fm.getProvider();
    const eth = new Eth(provider, undefined, {
      transactionConfirmationBlocks: 1,
    });

    return { eth, provider, unsubscribe: () => fm.user.logout() };
  };

  return Rx.using(create, resource => {
    const eth = (resource as Resource).eth;
    const provider = (resource as Resource).provider;

    const enable$ = Rx.defer(() => provider.enable() as Promise<string[]>).pipe(startWith([]));
    const initial$ = enable$.pipe(
      switchMap(async accounts => {
        const network = networkFromId(await eth.net.getId());
        return connectionEstablished(eth, network, accounts);
      }),
      catchError(error => {
        if (error?.code === 4001) {
          return Rx.of(connectionLost());
        }

        return Rx.throwError(error);
      }),
      retryWhen(error => error.pipe(delay(1000)))
    );

    return Rx.concat(initial$, Rx.NEVER);
  });
};

export const FortmaticComponent: React.FC<ConnectionMethodProps> = ({ connect, disconnect, active }) => {
  return (
    <>
      <SectionTitle>Fortmatic</SectionTitle>

      {!active ? (
        <Button length="stretch" onClick={() => connect()}>
          Connect
        </Button>
      ) : (
        <Button length="stretch" onClick={() => disconnect()}>
          Disconnect
        </Button>
      )}
    </>
  );
};

export const method: ConnectionMethod = {
  connect,
  supported: () => !!process.env.MELON_FORTMATIC_KEY && !!getConfig(NetworkEnum.MAINNET),
  component: FortmaticComponent,
  icon: 'FORTMATIC',
  name: 'fortmatic',
  label: 'Fortmatic',
};
