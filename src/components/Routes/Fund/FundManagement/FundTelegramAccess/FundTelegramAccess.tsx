import React from 'react';
import * as Yup from 'yup';
import { useForm, FormContext } from 'react-hook-form';
import { Block, BlockActions } from '~/storybook/components/Block/Block';
import { SectionTitle } from '~/storybook/components/Title/Title';
import { Input } from '~/storybook/components/Input/Input';
import { Button } from '~/storybook/components/Button/Button';

export const FundTelegramAccess: React.FC = () => {
  const validationSchema = Yup.object().shape({
    telegramId: Yup.string(),
  });

  const defaultValues = {
    telegramId: '',
  };

  const form = useForm<typeof defaultValues>({
    defaultValues,
    validationSchema,
    mode: 'onSubmit',
  });

  const submit = form.handleSubmit(data => {
    console.log(data);
  });

  return (
    <Block>
      <SectionTitle>Private Telegram Channel</SectionTitle>
      <FormContext {...form}>
        <form onSubmit={submit}>
          <Input id="telegramId" name="telegramId" placeholder="Enter your telegram ID" type="text" />
          <BlockActions>
            <Button type="submit">Get Access</Button>
          </BlockActions>
        </form>
      </FormContext>
    </Block>
  );
};
