import { NetworkEnum } from '~/types';

export const networkFromId = (id?: number) => {
  if (!id) {
    return NetworkEnum.OFFLINE;
  }

  if (id === 1) {
    return NetworkEnum.MAINNET;
  }

  if (id === 42) {
    return NetworkEnum.KOVAN;
  }

  return NetworkEnum.INVALID;
};