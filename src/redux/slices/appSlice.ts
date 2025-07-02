import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppStateType } from 'types';

const initialState: AppStateType = {
  dappOrigin: {
    pathname: '',
    search: ''
  },
  refetch: 0,
  txSubmittedModal: {
    sessionId: '',
    submittedMessage: ''
  },

  usdValue: undefined
};

export const appSlice = createSlice({
  name: 'applicationDefaultSlice',
  initialState,
  reducers: {
    setDappOrigin: (
      state: AppStateType,
      action: PayloadAction<AppStateType['dappOrigin']>
    ) => {
      const dappOrigin = action.payload;
      state.dappOrigin = dappOrigin;
    },
    updateRefetch: (state: AppStateType) => {
      state.refetch = Date.now();
    },

    setTxSubmittedModal: (
      state: AppStateType,
      action: PayloadAction<AppStateType['txSubmittedModal']>
    ) => {
      const txSubmittedModal = action.payload;
      state.txSubmittedModal = txSubmittedModal;
    },

    setUsdValue: (
      state: AppStateType,
      action: PayloadAction<AppStateType['usdValue']>
    ) => {
      const usdValue = action.payload;
      state.usdValue = usdValue;
    }
  }
});

export const { setDappOrigin, updateRefetch, setUsdValue } = appSlice.actions;

export default appSlice.reducer;
