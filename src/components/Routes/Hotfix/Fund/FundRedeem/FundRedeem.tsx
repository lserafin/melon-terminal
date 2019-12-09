import React from 'react';
import * as S from './FundRedeem.styles';
import * as Yup from 'yup';
import { useEnvironment } from '~/hooks/useEnvironment';
import { useFundInvestQuery } from '~/queries/FundInvest';
import useForm, { FormContext } from 'react-hook-form';
import { Participation } from '@melonproject/melonjs';
import { useTransaction } from '~/hooks/useTransaction';
import BigNumber from 'bignumber.js';
import { TransactionModal } from '~/components/Common/TransactionModal/TransactionModal';
import { InputField } from '~/components/Common/Form/InputField/InputField';
import { SubmitButton } from '~/components/Common/Form/SubmitButton/SubmitButton';
import { useFundDetailsQuery } from '~/queries/FundDetails';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import { refetchQueries } from '~/utils/refetchQueries';
import { useOnChainClient } from '~/hooks/useQuery';

export interface RedeemProps {
  address: string;
}

const validationSchema = Yup.object().shape({
  shareQuantity: Yup.number()
    .required()
    .positive(),
  redeemAll: Yup.boolean(),
});

const defaultValues = {
  shareQuantity: 1,
  redeemAll: false,
};

export const FundRedeem: React.FC<RedeemProps> = ({ address }) => {
  const environment = useEnvironment()!;
  const [result, query] = useFundInvestQuery(address);
  const client = useOnChainClient();

  const account = result && result.account;
  const participationAddress = account && account.participation && account.participation.address;
  const hasInvested = account && account.participation && account.participation.hasInvested;
  const shares = account && account.shares;

  const participationContract = new Participation(environment, participationAddress);

  const transaction = useTransaction(environment, {
    onFinish: () => refetchQueries(client),
  });

  const form = useForm<typeof defaultValues>({
    defaultValues,
    validationSchema,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const redeemAll = form.watch('redeemAll') as boolean;

  const submit = form.handleSubmit(async data => {
    if (redeemAll) {
      const tx = participationContract.redeem(environment.account!);
      transaction.start(tx);
      return;
    }

    const shareQuantity = new BigNumber(data.shareQuantity).times(new BigNumber(10).exponentiatedBy(18));
    const tx = participationContract.redeemQuantity(environment.account!, shareQuantity);
    transaction.start(tx);
  });

  const handleRedeemAllClick = (e: any) => {
    shares && form.setValue('shareQuantity', shares.balanceOf.toNumber());
  };

  if (query.loading) {
    return (
      <S.Wrapper>
        <S.Title>Redeem assets</S.Title>
        <Spinner positioning="centered" />
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Title>Redeem assets</S.Title>
      {hasInvested && shares && (
        <>
          <p>
            You own {shares.balanceOf.toString()} shares!
            <br />
            <br />
          </p>
          <FormContext {...form}>
            <form onSubmit={submit}>
              <InputField
                id="shareQuantity"
                name="shareQuantity"
                label="Number of shares to redeem"
                type="number"
                step="any"
                min="0"
                max={shares.balanceOf.toString()}
                disabled={redeemAll}
              />

              <input
                type="checkbox"
                ref={form.register}
                name="redeemAll"
                id="redeemAll"
                onClick={handleRedeemAllClick}
              />
              <label htmlFor="redeemAll">Redeem all shares</label>

              <SubmitButton label="Redeem" id="action" />
            </form>
          </FormContext>
          <TransactionModal transaction={transaction} title="Redeem shares" />
        </>
      )}
    </S.Wrapper>
  );
};
