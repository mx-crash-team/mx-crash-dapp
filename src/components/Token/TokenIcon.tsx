import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';
import { WithClassnameType } from '@multiversx/sdk-dapp/UI/types';
import classNames from 'classnames';

export interface TokenIconUIType extends WithClassnameType {
  tokenDetails?: TokenType & { assets?: { logo?: string } };
}

export const TokenIcon = ({ tokenDetails, className }: TokenIconUIType) => {
  const existingAsset =
    tokenDetails?.assets?.svgUrl || tokenDetails?.assets?.pngUrl;
  const iconUrl = existingAsset || '/assets/images/default-token-icon.png';

  return (
    <img
      src={iconUrl}
      className={classNames('token-icon', className)}
      alt=''
      role='presentation'
    />
  );
};
