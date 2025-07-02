import { TokenType } from '@multiversx/sdk-dapp/types/tokens.types';
import {
  FormatAmount,
  FormatAmountPropsType
} from '@multiversx/sdk-dapp/UI/FormatAmount';
import { WithClassnameType } from '@multiversx/sdk-dapp/UI/types';
import classNames from 'classnames';

import { ReactComponent as EgldSymbol } from 'assets/images/symbol.svg';
import { TokenIcon } from 'components';
import { DIGITS } from 'config';

interface FormatBalancePropsType
  extends FormatAmountPropsType,
    WithClassnameType {
  showIcon?: boolean;
  superSuffix?: boolean;
  tokenDetails?: TokenType;
}

export const FormatBalance = (props: FormatBalancePropsType) => {
  const {
    className,
    token,
    tokenDetails,
    showIcon = true,
    showLabel = true,
    digits = DIGITS,
    superSuffix
  } = props;

  const label = (tokenDetails?.ticker || token || 'EGLD').toUpperCase();

  return (
    <span className={classNames('format-balance', className)}>
      {showIcon && (
        <>
          {tokenDetails || token ? (
            <TokenIcon
              tokenDetails={tokenDetails}
              className='format-balance-token-symbol'
            />
          ) : (
            <EgldSymbol className='format-balance-symbol' />
          )}
        </>
      )}
      <FormatAmount {...props} showLabel={false} digits={digits} />
      {showLabel && (
        <>
          {superSuffix ? (
            <sup className='format-balance-suffix'>{label}</sup>
          ) : (
            <span className='format-balance-suffix'>{label}</span>
          )}
        </>
      )}
    </span>
  );
};
