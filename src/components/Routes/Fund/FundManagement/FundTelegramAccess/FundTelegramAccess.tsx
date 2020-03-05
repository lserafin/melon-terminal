import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm, FormContext } from 'react-hook-form';
import { Block, BlockActions } from '~/storybook/components/Block/Block';
import { SectionTitle } from '~/storybook/components/Title/Title';
import { Input } from '~/storybook/components/Input/Input';
import { Button } from '~/storybook/components/Button/Button';
import { useEnvironment } from '~/hooks/useEnvironment';
import { useAccount } from '~/hooks/useAccount';

export const FundTelegramAccess: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dislayUrl, setDislayUrl] = useState<null | string>(null);
  const environment = useEnvironment()!;
  const account = useAccount();

  const validationSchema = Yup.object().shape({
    telegramId: Yup.string().required(),
  });

  const defaultValues = {
    telegramId: '',
  };

  const form = useForm<typeof defaultValues>({
    defaultValues,
    validationSchema,
    mode: 'onSubmit',
  });

  const submit = form.handleSubmit(async data => {
    try {
      setLoading(true);

      const signedTransaction = await environment?.client.sign(data.telegramId, account.address!);

      const res = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: account.address,
          telegramId: data.telegramId,
          signedTransaction: signedTransaction,
        }),
      });

      const response = await res.json();

      if (response.error) {
        form.setError('telegramId', response.message);
        setLoading(false);
        return;
      }
      form.setValue('telegramId', '');
      setLoading(false);
      setDislayUrl(`${response.message}?start=${account.address}`);
    } catch (e) {
      console.error(e);
      form.setError('telegramId', e.message);
      setLoading(false);
    }
  });

  return (
    <Block>
      <SectionTitle>Private Telegram Channel</SectionTitle>
      {dislayUrl ? (
        <a href={dislayUrl!} target="_blank">
          Get access to our private Telegram Channel
        </a>
      ) : (
        <FormContext {...form}>
          <form onSubmit={submit}>
            <Input id="telegramId" name="telegramId" placeholder="Enter your telegram ID" type="text" />
            <BlockActions>
              <Button type="submit" loading={loading}>
                Get Access
              </Button>
            </BlockActions>
          </form>
        </FormContext>
      )}
    </Block>
  );
};
