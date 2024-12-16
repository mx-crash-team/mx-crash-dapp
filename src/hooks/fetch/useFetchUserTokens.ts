import { useEffect, useState } from 'react';

import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';
import { formatAmount, getUsdValue } from '@multiversx/sdk-dapp/utils';
import BigNumber from 'bignumber.js';
import { useSelector } from 'react-redux';

import { useApiRequests, useGetNativeTokenDetails } from 'hooks';
import { usdValueSelector } from 'redux/selectors';

const TOKEN_FIELDS = [
  'name',
  'ticker',
  'decimals',
  'assets',
  'price',
  'balance',
  'valueUsd',
  'isLowLiquidity'
];

export const useFetchUserTokens = () => {
  const nativeTokenDetails = useGetNativeTokenDetails();
  const usdValue = useSelector(usdValueSelector);

  const {
    account: { address, balance }
  } = useGetAccountInfo();
  const { getAccountTokens } = useApiRequests();

  const [isDataReady, setIsDataReady] = useState<boolean | undefined>();
  const [accountESDTokens, setAccountESDTokens] = useState<TokenType[]>([]);

  const fetchAccountTokens = async () => {
    const { data, success } = await getAccountTokens({
      address,
      includeMetaESDT: false,
      size: 1000,
      fields: TOKEN_FIELDS.join(',')
    });

    if (success && data) {
      setAccountESDTokens(data);
    }
    setIsDataReady(success);
  };

  useEffect(() => {
    if (address) {
      fetchAccountTokens();
    }
  }, [address]);

  const tokenBalance = accountESDTokens.reduce(
    (accumulator, currentValue) =>
      accumulator.plus(new BigNumber(currentValue?.valueUsd ?? 0)),
    new BigNumber(0)
  );

  const availableBalance = formatAmount({ input: balance, decimals: 18 });
  const egldUsdBalance = new BigNumber(availableBalance).times(usdValue ?? 0);
  const totalBalance = new BigNumber(egldUsdBalance).plus(tokenBalance);

  const usdAccountValue = getUsdValue({
    amount: totalBalance.toString(),
    usd: 1,
    decimals: 2,
    addEqualSign: true
  });

  const nativeTokenRow = {
    ...nativeTokenDetails,
    balance,
    valueUsd: new BigNumber(egldUsdBalance).toNumber()
  };

  const accountTokens = [nativeTokenRow, ...accountESDTokens];

  return {
    usdAccountValue,
    isDataReady,
    accountESDTokens,
    accountTokens
  };
};
