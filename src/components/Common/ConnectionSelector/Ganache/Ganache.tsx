import React from 'react';
import * as Rx from 'rxjs';
import { retryWhen, delay } from 'rxjs/operators';
import { Eth } from 'web3-eth';
import { HttpProvider } from 'web3-providers';
import { networkFromId } from '~/utils/networkFromId';
import { connectionEstablished, ConnectionAction, ConnectionMethod } from '~/components/Contexts/Connection/Connection';
import { SubmitButton } from '~/components/Common/Form/SubmitButton/SubmitButton';

interface EthResource extends Rx.Unsubscribable {
  eth: Eth;
}

const connect = (): Rx.Observable<ConnectionAction> => {
  const create = (): EthResource => {
    const provider = new HttpProvider(process.env.MELON_TESTNET_PROVIDER);
    const eth = new Eth(provider, undefined, {
      transactionConfirmationBlocks: 1,
    });

    return { eth, unsubscribe: () => provider.disconnect() };
  };

  return Rx.using(create, resource => {
    const eth = (resource as EthResource).eth;

    const connection$ = Rx.defer(async () => {
      // @ts-ignore
      const ganache = (await import('deployments/testnet-accounts')) as any;
      const keys = Object.entries(ganache.private_keys) as [string, string][];

      keys.forEach(([address, key]) => {
        eth.accounts.wallet.add({
          address,
          privateKey: !key.startsWith('0x') ? `0x${key}` : key,
        });
      });

      const [id, accounts] = await Promise.all([eth.net.getId(), eth.getAccounts()]);
      const network = networkFromId(id);
      return connectionEstablished(eth, network, accounts);
    }).pipe(retryWhen(error => error.pipe(delay(1000))));

    return connection$;
  });
};

export const Ganache: React.FC<any> = ({ select, active }) => {
  return (
    <div>
      <h2>Ganache</h2>
      {!active ? <SubmitButton onClick={() => select()} label="Connect" /> : <div>Currently selected</div>}
    </div>
  );
};

export const method: ConnectionMethod = {
  connect,
  component: Ganache,
  name: 'Ganache',
};
