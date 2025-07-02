import { useCallback } from 'react';
import { Address, TokenTransfer, U32Value } from '@multiversx/sdk-core/out';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';

import { SC_GAS_LIMIT } from 'config';
import { getChainId, signAndSendTransactions, smartContract } from 'helpers';

const CLAIM_TRANSACTION_INFO = {
  processingMessage: 'Processing Claim transaction',
  errorMessage: 'An error has occured during Claim',
  successMessage: 'Claim transaction successful'
};

export const useSendClaimTransaction = () => {
  const { address } = useGetAccountInfo();

  const sendClaimTransactionFromAbi = useCallback(
    async ({ callbackRoute }: any) => {
      const claimTransaction = smartContract.methodsExplicit
        .claim()
        .withSender(new Address(address))
        .withValue('0')
        .withGasLimit(SC_GAS_LIMIT)
        .withChainID(getChainId())
        .buildTransaction();

      await signAndSendTransactions({
        transactions: [claimTransaction],
        callbackRoute,
        transactionsDisplayInfo: CLAIM_TRANSACTION_INFO
      });
    },
    []
  );

  return {
    sendClaimTransactionFromAbi
  };
};
