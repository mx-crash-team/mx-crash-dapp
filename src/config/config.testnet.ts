import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import { NetworkType } from '@multiversx/sdk-dapp/types';

export * from './sharedConfig';

export const environment = 'testnet';

export const network: NetworkType & { idApi: string; extrasApi: string } = {
  ...fallbackNetworkConfigurations.testnet,
  idApi: 'https://testnet-id-api.multiversx.com/api/v1',
  extrasApi: 'https://testnet-extras-api.multiversx.com'
};
