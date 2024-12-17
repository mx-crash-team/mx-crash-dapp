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

export const websocketEventSelector = createDeepEqualSelector(
  accountInfoSelector,
  (state) => state.websocketEvent
);

export const websocketStatusSelector = createDeepEqualSelector(
  accountInfoSelector,
  (state) => state.websocketStatus
);

export const websocketNewBetsSelector = createDeepEqualSelector(
  accountInfoSelector,
  (state) => state.websocketNewBets
);

export const websocketChatSelector = createDeepEqualSelector(
  accountInfoSelector,
  (state) => state.websocketChat
);
