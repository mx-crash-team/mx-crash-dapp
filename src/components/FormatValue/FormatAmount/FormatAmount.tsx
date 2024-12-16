import { ELLIPSIS, DECIMALS } from '@multiversx/sdk-dapp/constants';
import { FormatAmountPropsType as SdkDappFormatAmountType } from '@multiversx/sdk-dapp/UI/FormatAmount/formatAmount.types';
import { stringIsInteger } from '@multiversx/sdk-dapp/utils/validation/stringIsInteger';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { ReactComponent as EgldSymbol } from 'assets/images/symbol.svg';
import { DIGITS } from 'config';
import { formatAmount } from 'helpers';
import { useGetEgldLabel } from 'hooks';
import { usdValueSelector } from 'redux/selectors';
import { FormatDisplayValue } from '../FormatDisplayValue';
import { FormatUSD } from '../FormatUSD';

export interface FormatAmountUIType extends SdkDappFormatAmountType {
  showTooltip?: boolean;
  showSymbol?: boolean;
  superSuffix?: boolean;
  showUsdValue?: boolean;
  decimalOpacity?: boolean;
  usd?: string | number;
}

export const FormatAmount = (props: FormatAmountUIType) => {
  const usdValue = useSelector(usdValueSelector);
  const egldLabel = useGetEgldLabel();

  const {
    value,
    className,
    token,
    digits = DIGITS,
    decimals = DECIMALS,
    showLastNonZeroDecimal = false,
    showSymbol = true,
    showUsdValue = true,
    showLabel,
    showTooltip = true,
    usd
  } = props;
  const dataTestId = props['data-testid'] ?? 'formatAmountComponent';

  if (!stringIsInteger(value)) {
    return (
      <span
        data-testid={dataTestId}
        className={classNames(className, 'fam invalid')}
      >
        {ELLIPSIS}
      </span>
    );
  }

  const isZero = new BigNumber(value).isZero();
  const formattedValue = formatAmount({
    input: value,
    decimals,
    digits,
    showLastNonZeroDecimal,
    addCommas: true
  });

  const completeValue = digits
    ? formatAmount({
        input: value,
        decimals,
        digits,
        showLastNonZeroDecimal: true,
        addCommas: true
      })
    : formattedValue;

  const showUsdValueTooltip =
    showTooltip &&
    showUsdValue &&
    !isZero &&
    (showSymbol || showLabel) &&
    (usdValue || (usd && !token));

  return (
    <FormatDisplayValue
      {...props}
      formattedValue={formattedValue}
      completeValue={completeValue}
      label={token || egldLabel}
      data-testid={dataTestId}
      showSymbol={showSymbol}
      showLastNonZeroDecimal={showLastNonZeroDecimal}
      showTooltipLabel
      spacedLabel
      {...(showSymbol && !token
        ? {
            symbol: (
              <>
                <EgldSymbol className='sym' />{' '}
              </>
            )
          }
        : {})}
      {...(showUsdValueTooltip
        ? {
            details: (
              <>
                {usd ? '' : 'Current '}
                USD Value:{' '}
                <FormatUSD
                  usd={usd}
                  value={value}
                  decimals={decimals}
                  digits={digits}
                  showTooltip={false}
                  showPrefix={false}
                />
              </>
            )
          }
        : {})}
    />
  );
};
