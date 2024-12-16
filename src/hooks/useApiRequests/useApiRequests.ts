import defaultAxios from 'axios';

import { network } from 'config';

import { asyncWrapper } from './helpers';

export const useApiRequests = () => {
  const { apiAddress } = network;

  return {
    // MultiversX API

    getUsdPrice: () =>
      asyncWrapper(() =>
        defaultAxios.get(`${apiAddress}/economics`, {
          timeout: parseInt(network.apiTimeout)
        })
      ),

    getAccountTokens: ({ address, ...rest }: any & { address: string }) =>
      asyncWrapper(() =>
        defaultAxios.get(`${apiAddress}/accounts/${address}/tokens`, {
          params: rest,
          timeout: parseInt(network.apiTimeout)
        })
      ),

    // ID API

    getUserInfo: () =>
      asyncWrapper(() =>
        defaultAxios.get(`${network.idApi}/self/info`, {
          timeout: parseInt(network.apiTimeout)
        })
      )
  };
};
