import React, { FormEvent } from 'react';
import * as S from './FundShutdown.styles';
import { useEnvironment } from '~/hooks/useEnvironment';
import { useTransaction } from '~/hooks/useTransaction';
import { useHistory } from 'react-router';
import { ButtonBlock } from '~/components/Common/Form/ButtonBlock/ButtonBlock';
import { Version } from '@melonproject/melonjs';
import { SubmitButton } from '~/components/Common/Form/SubmitButton/SubmitButton';
import { TransactionModal } from '~/components/Common/TransactionModal/TransactionModal';
import { refetchQueries } from '~/utils/refetchQueries';
import { useOnChainClient } from '~/hooks/useQuery';

export interface ShutdownProps {
  address: string;
}

export const FundShutdown: React.FC<ShutdownProps> = ({ address }) => {
  const environment = useEnvironment()!;
  const client = useOnChainClient();
  const history = useHistory();
  const version = new Version(environment, environment.deployment.melonContracts.version);

  const transaction = useTransaction(environment, {
    onFinish: () => {
      refetchQueries(client, ['FundDetailsQuery']);
    },
    onAcknowledge: () => {
      history.push(`/fund/${address}`);
    },
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const tx = version.shutDownFund(environment.account!, address);
    transaction.start(tx);
  };

  return (
    <S.Wrapper>
      <S.Title>Shut down fund</S.Title>
      <p>
        Shutting down your fund closes the fund for new investors and trades will no longer be possible. Investor can
        redeem their shares whenever they want.
      </p>

      <form onSubmit={submit}>
        <ButtonBlock>
          <SubmitButton label="Shutdown fund" />
        </ButtonBlock>
      </form>

      <TransactionModal transaction={transaction} title="Shutdown fund" />
    </S.Wrapper>
  );
};
