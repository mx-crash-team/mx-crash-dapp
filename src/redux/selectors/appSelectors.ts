import { createDeepEqualSelector } from './helpers';
import { RootState } from '../store';

export const appSelector = (state: RootState) => state.app;

export const dappOriginSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.dappOrigin
);

export const refetchOriginSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.refetch
);

export const txSubmittedModalSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.txSubmittedModal
);

export const usdValueSelector = createDeepEqualSelector(
  appSelector,
  (state) => state.usdValue
);
