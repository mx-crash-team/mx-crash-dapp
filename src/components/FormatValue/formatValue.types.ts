import { FormatAmountPropsType as SdkDappFormatAmountType } from '@multiversx/sdk-dapp/UI/FormatAmount/formatAmount.types';

export interface FormatAmountUIType extends SdkDappFormatAmountType {
  showTooltip?: boolean;
  showSymbol?: boolean;
  superSuffix?: boolean;
  showUsdValue?: boolean;
  decimalOpacity?: boolean;
  usd?: string | number;
}
