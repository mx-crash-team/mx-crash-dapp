import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';
import { WithClassnameType } from '@multiversx/sdk-dapp/UI/types';
import classNames from 'classnames';

export interface TokenUIType extends WithClassnameType {
  tokenDetails: TokenType;
}

export const Token = ({ tokenDetails, className }: TokenUIType) => {
  if (!tokenDetails) {
    return null;
  }

  return <div className={classNames('token', className)}></div>;
};
