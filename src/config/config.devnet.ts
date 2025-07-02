import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import { NetworkType } from '@multiversx/sdk-dapp/types';

export * from './sharedConfig';

export const environment = 'devnet';

export const network: NetworkType & { idApi: string; extrasApi: string } = {
  ...fallbackNetworkConfigurations.devnet,
  idApi: 'https://devnet-id-api.multiversx.com/api/v1',
  extrasApi: 'https://devnet-extras-api.multiversx.com'
};
