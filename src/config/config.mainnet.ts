import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import { NetworkType } from '@multiversx/sdk-dapp/types';

export * from './sharedConfig';

export const environment = 'mainnet';

export const network: NetworkType & { idApi: string; extrasApi: string } = {
  ...fallbackNetworkConfigurations.mainnet,
  idApi: 'https://id-api.multiversx.com/api/v1',
  extrasApi: 'https://extras-api.multiversx.com',
  apiAddress: 'https://internal-api.multiversx.com'
};
