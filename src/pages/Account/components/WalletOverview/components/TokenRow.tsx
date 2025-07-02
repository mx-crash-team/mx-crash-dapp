import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';

import { FormatAmount, TokenIcon, FormatUSD } from 'components';
import { WithClassnameType } from 'types';

export interface WalletOverviewUIType extends WithClassnameType {
  token: TokenType;
}

export const TokenRow = ({ token }: WalletOverviewUIType) => {
  return (
    <div className='token-row d-flex align-items-center justify-content-between flex-wrap gap-3'>
      <div className='d-flex align-items-center gap-3'>
        <TokenIcon tokenDetails={token} />
        <div className='d-flex flex-column'>
          <strong>{token.ticker}</strong>
          <FormatUSD value={token.price ?? '0'} usd={1} showPrefix={false} />
        </div>
      </div>
      <div className='d-flex flex-column align-items-end'>
        <FormatAmount
          token={token.ticker}
          value={token.balance ?? '0'}
          decimals={token.decimals}
          digits={2}
          showSymbol={false}
          className='fw-bold'
        />
        <FormatUSD value={token.valueUsd ?? '0'} usd={1} showPrefix={false} />
      </div>
    </div>
  );
};
