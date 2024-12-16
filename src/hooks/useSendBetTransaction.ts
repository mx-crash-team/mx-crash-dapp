import { useState, useCallback } from 'react';
import { Address, TokenTransfer, U32Value } from '@multiversx/sdk-core/out';
import { GAS_PRICE, VERSION } from '@multiversx/sdk-dapp/constants';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks/transactions/useTrackTransactionStatus';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { newTransaction } from '@multiversx/sdk-dapp/models';
import {
  deleteTransactionToast,
  removeAllSignedTransactions,
  removeAllTransactionsToSign
} from '@multiversx/sdk-dapp/services/transactions/clearTransactions';

import { contractAddress, SC_GAS_LIMIT } from 'config';
import { getChainId, signAndSendTransactions, smartContract } from 'helpers';

const BET_TRANSACTION_INFO = {
  processingMessage: 'Processing Bet transaction',
  errorMessage: 'An error has occured during Bet',
  successMessage: 'Bet transaction successful'
};

export const useSendBetTransaction = () => {
  const [betSessionId, setBetSessionId] = useState('');

  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const transactionStatus = useTrackTransactionStatus({
    transactionId: betSessionId ?? '0'
  });

  const clearAllTransactions = () => {
    removeAllSignedTransactions();
    removeAllTransactionsToSign();
    deleteTransactionToast(betSessionId ?? '');
  };

  const sendBetTransaction = useCallback(
    async ({ amount, callbackRoute }: any) => {
      clearAllTransactions();

      const betTransaction = newTransaction({
        value: amount,
        data: 'submitBet',
        receiver: contractAddress,
        gasLimit: SC_GAS_LIMIT,
        gasPrice: GAS_PRICE,
        chainID: network.chainId,
        version: VERSION
      });

      const sessionId = await signAndSendTransactions({
        transactions: [betTransaction],
        callbackRoute,
        transactionsDisplayInfo: BET_TRANSACTION_INFO
      });
      console.log('--sessionId', sessionId);

      // sessionStorage.setItem(type, sessionId);
      // setBetSessionId(sessionId);
    },
    []
  );

  const sendBetTransactionFromAbi = useCallback(
    async ({ amount, cash_out, callbackRoute }: any) => {
      clearAllTransactions();

      const betTransaction = smartContract.methodsExplicit
        .submitBet([new U32Value(cash_out)])
        .withSender(new Address(address))
        .withValue(TokenTransfer.egldFromAmount(amount ?? '0'))
        .withGasLimit(SC_GAS_LIMIT)
        .withChainID(getChainId())
        .buildTransaction();

      const sessionId = await signAndSendTransactions({
        transactions: [betTransaction],
        callbackRoute,
        transactionsDisplayInfo: BET_TRANSACTION_INFO
      });

      // sessionStorage.setItem(type, sessionId);
      // setBetSessionId(sessionId);
    },
    []
  );

  return {
    sendBetTransaction,
    sendBetTransactionFromAbi,

    transactionStatus
  };
};
