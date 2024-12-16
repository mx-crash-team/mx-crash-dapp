import { Transaction } from '@multiversx/sdk-core/out';

export {
  SignedMessageStatusesEnum,
  LoginMethodsEnum,
  EnvironmentsEnum
} from '@multiversx/sdk-dapp/types/enums.types';
import { sendTransactions } from '@multiversx/sdk-dapp/services/transactions/sendTransactions';
import { TransactionsDisplayInfoType } from '@multiversx/sdk-dapp/types/transactions.types';
import { refreshAccount } from '@multiversx/sdk-dapp/utils/account/refreshAccount';

type SignAndSendTransactionsProps = {
  transactions: Transaction[];
  callbackRoute: string;
  transactionsDisplayInfo: TransactionsDisplayInfoType;
};

export const signAndSendTransactions = async ({
  transactions,
  callbackRoute,
  transactionsDisplayInfo
}: SignAndSendTransactionsProps) => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  await refreshAccount();

  const { sessionId } = await sendTransactions({
    transactions,
    transactionsDisplayInfo,
    redirectAfterSign: false,
    callbackRoute,
    // NOTE: performing async calls (eg: `await refreshAccount()`) before opening a new tab
    // can cause the new tab to be blocked by Safari's popup blocker.
    // To support this feature, we can set `hasConsentPopup` to `true`
    hasConsentPopup: isSafari
  });

  return sessionId;
};
