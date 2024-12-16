import { createDeepEqualSelector } from './helpers';
import { RootState } from '../store';

export const accountInfoSelector = (state: RootState) => state.account;

export const accountSelector = createDeepEqualSelector(
  accountInfoSelector,
  (state) => state
);

export const accountIdentitySelector = createDeepEqualSelector(
  accountInfoSelector,
  (account) => {
    account.identity;
  }
);
