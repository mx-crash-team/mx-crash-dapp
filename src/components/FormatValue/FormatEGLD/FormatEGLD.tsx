import { ELLIPSIS } from '@multiversx/sdk-dapp/constants';
import { stringIsFloat } from '@multiversx/sdk-dapp/utils/validation/stringIsFloat';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { ReactComponent as EgldSymbol } from 'assets/images/symbol.svg';

import { DIGITS } from 'config';
import { formatBigNumber } from 'helpers';
import { useGetEgldLabel } from 'hooks';
import { usdValueSelector } from 'redux/selectors';

import { FormatDisplayValue } from '../FormatDisplayValue';
import { FormatUSD } from '../FormatUSD';
import { FormatAmountUIType } from '../formatValue.types';

export interface FormatEGLDUIType extends Omit<FormatAmountUIType, 'value'> {
  value: string | number;
  showUsdValue?: boolean;
  usd?: string | number;
}

export const FormatEGLD = (props: FormatEGLDUIType) => {
  const egldLabel = useGetEgldLabel();
  const usdValue = useSelector(usdValueSelector);

  const {
    value,
    usd,
    digits = DIGITS,
    showSymbol,
    showUsdValue = true,
    className
  } = props;
  const numberValue = String(value).replace(/[^\d.-]/g, '');

  if (!stringIsFloat(numberValue)) {
    <span
      className={classNames(className, 'fam invalid')}
      {...(props['data-testid'] ? { 'data-testid': props['data-testid'] } : {})}
    >
      {ELLIPSIS}
    </span>;
  }

  const bNValue = new BigNumber(numberValue);
  const completeValue = bNValue.toFormat();
  const formattedValue = bNValue.isInteger()
    ? completeValue
    : formatBigNumber({ value: bNValue, digits });

  const showUsdValueTooltip =
    !bNValue.isZero() && showUsdValue && (usdValue || usd);

  return (
    <FormatDisplayValue
      {...props}
      formattedValue={formattedValue}
      completeValue={completeValue}
      label={egldLabel}
      showTooltipLabel
      spacedLabel
      {...(showSymbol && !props.token
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
                  value={numberValue}
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
