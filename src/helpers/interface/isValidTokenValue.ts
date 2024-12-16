import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';
import BigNumber from 'bignumber.js';

export const isValidTokenValue = (
  token: TokenType & { isLowLiquidity: boolean }
) => {
  return Boolean(
    token.valueUsd &&
      (!token.isLowLiquidity ||
        new BigNumber(token.valueUsd).isLessThan(1_000_000))
  );
};
