import { useCallback } from 'react';
import { Address, TokenTransfer, U32Value } from '@multiversx/sdk-core/out';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';

import { SC_GAS_LIMIT } from 'config';
import { getChainId, signAndSendTransactions, smartContract } from 'helpers';

const BET_TRANSACTION_INFO = {
  processingMessage: 'Processing Bet transaction',
  errorMessage: 'An error has occured during Bet',
  successMessage: 'Bet transaction successful'
};

export const useSendBetTransaction = () => {
  const { address } = useGetAccountInfo();

  const sendBetTransactionFromAbi = useCallback(
    async ({ amount, cash_out, callbackRoute }: any) => {
      const betTransaction = smartContract.methodsExplicit
        .submitBet([...(Math.round(cash_out) ? [new U32Value(cash_out)] : [])])
        .withSender(new Address(address))
        .withValue(TokenTransfer.egldFromAmount(amount ?? '0'))
        .withGasLimit(SC_GAS_LIMIT)
        .withChainID(getChainId())
        .buildTransaction();

      await signAndSendTransactions({
        transactions: [betTransaction],
        callbackRoute,
        transactionsDisplayInfo: BET_TRANSACTION_INFO
      });
    },
    []
  );

  return {
    sendBetTransactionFromAbi
  };
};
