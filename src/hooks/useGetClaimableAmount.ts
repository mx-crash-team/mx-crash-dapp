import { useEffect, useState } from 'react';

import {
  Address,
  AddressValue,
  ProxyNetworkProvider
} from '@multiversx/sdk-core/out';
import { ContractFunction } from '@multiversx/sdk-core/out/smartcontracts/function';
import { ResultsParser } from '@multiversx/sdk-core/out/smartcontracts/resultsParser';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';

import { smartContract } from 'helpers';

const resultsParser = new ResultsParser();

export const useGetClaimableAmount = () => {
  const { address } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const [claimableAmount, setClaimableAmount] = useState<string>('0');

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getClaimableAmount = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('available_prize'),
        args: [new AddressValue(new Address(address))]
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = smartContract.getEndpoint('available_prize');

      const { firstValue: amount } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      setClaimableAmount(amount?.valueOf()?.toString(10));
    } catch (err) {
      console.error('Unable to call getClaimableAmount', err);
    }
  };

  useEffect(() => {
    getClaimableAmount();
  }, []);

  return { claimableAmount, getClaimableAmount };
};
