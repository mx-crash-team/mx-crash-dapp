import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountStateType, SetAccountIdentityType } from 'types';

const initialState: AccountStateType = {
  identity: { isFetched: undefined, identity: undefined },
  websocketEvent: null
};

export const accountInfoSlice = createSlice({
  name: 'accountInfoSlice',
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    setAccountIdentity: (
      state: AccountStateType,
      action: PayloadAction<SetAccountIdentityType>
    ) => {
      state.identity = action.payload;
    },
    setWebsocketEvent: (
      state: AccountStateType,
      action: PayloadAction<string>
    ) => {
      state.websocketEvent = {
        timestamp: Date.now(),
        message: action.payload
      };
    }
  }
});

export const { resetState, setAccountIdentity, setWebsocketEvent } =
  accountInfoSlice.actions;

export default accountInfoSlice.reducer;
