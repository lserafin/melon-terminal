import React from 'react';
import BigNumber from 'bignumber.js';
import * as Yup from 'yup';
import useForm, { FormContext } from 'react-hook-form';
import { Version } from '@melonproject/melonjs';
import { InputField } from '~/components/Common/Form/InputField/InputField';
import { SubmitButton } from '~/components/Common/Form/SubmitButton/SubmitButton';
import { ButtonBlock } from '~/components/Common/Form/ButtonBlock/ButtonBlock';
import { useEnvironment } from '~/hooks/useEnvironment';
import { TransactionModal } from '~/components/Common/TransactionModalNew/TransactionModal';
import { useTransaction } from '~/hooks/useTransactionNew';
import { findToken } from '~/utils/findToken';

export interface WalletFundSetupForm {
  name: string;
  exchanges: string[];
  assets: string[];
  managementFee: number;
  performanceFee: number;
  performanceFeePeriod: number;
  termsAndConditions: boolean;
}

const terms = `
IMPORTANT NOTE: Please read the full version of this disclaimer carefully before using the MELON Protocol. YOUR
USE OF THE MELON PROTOCOL AND/OR THE SOFTWARE MAY BE SUBJECT TO THE FINANCIAL LAWS AND REGULATIONS OF VARIOUS
JURISDICTIONS. PRIOR TO USING THE MELON PROTOCOL, SEEK LEGAL ASSISTANCE TO ASSURE THAT YOU MAY USE THE SOFTWARE
IN COMPLIANCE WITH APPLICABLE LAW. FAILURE TO DO SO MAY SUBJECT YOU TO CRIMINAL AS WELL AS CIVIL PENALTIES IN
ONE OR MORE JURISDICTIONS. BY USING THIS SOFTWARE, YOU CONFIRM THAT YOU HAVE SOUGHT THE ADVICE OF COMPETENT
COUNSEL OR ARE OTHERWISE FAMILIAR WITH THE APPLICABLE LAWS AND REGULATIONS PERTAINING TO YOUR INTENDED USE OF
THE MELON PROTOCOL. BY USING THIS SOFTWARE, YOU UNDERSTAND, ACKNOWLEDGE AND ACCEPT THAT THE MELON PROTOCOL
AND/OR THE UNDERLYING SOFTWARE ARE PROVIDED “AS IS” AND WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND EITHER
EXPRESSED OR IMPLIED. ANY USE OF THIS OPEN SOURCE SOFTWARE RELEASED UNDER THE GNU GENERAL PUBLIC LICENSE VERSION
3 (GPL 3) IS DONE AT YOUR OWN RISK TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW ANY AND ALL
LIABILITY AS WELL AS ALL WARRANTIES, INCLUDING ANY FITNESS FOR A PARTICULAR PURPOSE WITH RESPECT TO THE MELON
PROTOCOL AND/OR THE UNDERLYING SOFTWARE AND THE USE THEREOF ARE DISCLAIMED.
`;

export const WalletFundSetup: React.FC = () => {
  const environment = useEnvironment()!;
  const tokens = Object.keys(environment.deployment.tokens.addr);
  const exchanges = [
    {
      name: 'MelonEngine',
      exchange: environment.deployment.melon.addr.Engine,
      adapter: environment.deployment.melon.addr.EngineAdapter,
    },
    {
      name: 'KyberNetwork',
      adapter: environment.deployment.melon.addr.KyberAdapter,
      exchange: environment.deployment.kyber.addr.KyberNetwork,
    },
    {
      name: 'OasisDex',
      adapter: environment.deployment.melon.addr.OasisDexAdapter,
      exchange: environment.deployment.oasis.addr.OasisDexExchange,
    },
    {
      name: 'ZeroEx',
      adapter: environment.deployment.melon.addr.ZeroExV2Adapter,
      exchange: environment.deployment.zeroex.addr.ZeroExV2Exchange,
    },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(1),
    exchanges: Yup.array<string>()
      .compact()
      .min(1),
    assets: Yup.array<string>()
      .compact()
      .min(1),
    managementFee: Yup.number()
      .min(0)
      .max(100),
    performanceFee: Yup.number()
      .min(0)
      .max(100),
    performanceFeePeriod: Yup.number().min(0),
  });

  const form = useForm<WalletFundSetupForm>({
    validationSchema,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const submit = form.handleSubmit(data => transaction.initialize(data));
  const transaction = useTransaction((values: WalletFundSetupForm) => {
    const factory = new Version(environment, environment.deployment.melon.addr.Version);
    const weth = findToken(environment.deployment, 'WETH');

    const assetAddresses = values.assets.map(symbol => findToken(environment.deployment, symbol)!.address);
    const selectedExchanges = exchanges.filter(item => values.exchanges.includes(item.name));
    const exchangeAddresses = selectedExchanges.map(exchange => exchange.exchange);
    const adapterAddresses = selectedExchanges.map(exchange => exchange.adapter);

    return factory.beginSetup(environment.account!, {
      name: values.name,
      adapters: adapterAddresses,
      exchanges: exchangeAddresses,
      fees: [environment.deployment.melon.addr.ManagementFee, environment.deployment.melon.addr.PerformanceFee],
      denominationAsset: weth!.address,
      defaultAssets: assetAddresses,
      feePeriods: [new BigNumber(0), new BigNumber(values.performanceFeePeriod!).multipliedBy(60 * 60 * 24)],
      feeRates: [
        new BigNumber(values.managementFee!).multipliedBy('1e16'),
        new BigNumber(values.performanceFee!).multipliedBy('1e16'),
      ],
    });
  });

  return (
    <>
      <h1>Fund</h1>
      <FormContext {...form}>
        <form onSubmit={submit}>
          <InputField id="name" name="name" label="Name" type="text" />
          <InputField name="managementFee" label="Management Fee (%)" type="number" />
          <InputField name="performanceFee" label="Performance Fee (%)" type="number" />
          <InputField name="performanceFeePeriod" label="Performance Fee Period (days)" type="number" />

          <h3>Exchanges</h3>
          {form.errors.exchanges && <p>{form.errors.exchanges.message}</p>}
          <ul>
            {exchanges.map((exchange, index) => (
              <li key={exchange.name}>
                <input
                  id={`exchanges[${index}]`}
                  type="checkbox"
                  name={`exchanges[${index}]`}
                  value={exchange.name}
                  key={exchange.name}
                  ref={form.register}
                />
                <label htmlFor={`exchanges[${index}]`}>{exchange}</label>
              </li>
            ))}
          </ul>

          <h3>Allowed Tokens</h3>
          {form.errors.assets && <p>{form.errors.assets.message}</p>}
          <ul>
            {tokens.map((token, index) => (
              <li key={token}>
                <input
                  id={`assets[${index}]`}
                  type="checkbox"
                  name={`assets[${index}]`}
                  value={token}
                  key={token}
                  ref={form.register}
                />
                <label htmlFor={`assets[${index}]`}>{token}</label>
              </li>
            ))}
          </ul>

          <h3>Disclaimer for the use of the Melon Protocol</h3>
          <p>{terms}</p>

          <input id="termsAndConditions" type="checkbox" name="termsAndConditions" ref={form.register} />
          <label htmlFor="termsAndConditions">I accept the terms and conditions</label>

          <ButtonBlock>
            <SubmitButton label="Create fund" />
          </ButtonBlock>
        </form>
      </FormContext>

      <TransactionModal transaction={transaction} label="Begin setup" />
    </>
  );
};

export default WalletFundSetup;
