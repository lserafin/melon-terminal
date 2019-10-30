import { fromWei } from 'web3-utils';
import { Hub, ManagementFee } from '@melonproject/melonjs';
import { Resolver } from '~/graphql';

export const rate: Resolver<[Hub, ManagementFee]> = async ([hub, management], _, context) => {
  const rate = await management.getManagementFeeRate(hub.contract.address, context.block);
  return fromWei(rate.multipliedBy(100).toFixed());
};