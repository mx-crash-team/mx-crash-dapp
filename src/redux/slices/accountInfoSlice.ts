import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountStateType, SetAccountIdentityType } from 'types';

const initialState: AccountStateType = {
  identity: { isFetched: undefined, identity: undefined },
  websocketEvent: null,
  websocketStatus: null,
  websocketNewBets: null,
  websocketChat: null
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
      action: PayloadAction<any>
    ) => {
      state.websocketEvent = {
        timestamp: Date.now(),
        message: action.payload
      };
    },
    setWebsocketStatus: (
      state: AccountStateType,
      action: PayloadAction<any>
    ) => {
      state.websocketStatus = {
        timestamp: Date.now(),
        data: action.payload
      };
    },
    setWebsocketNewBets: (
      state: AccountStateType,
      action: PayloadAction<any>
    ) => {
      state.websocketNewBets = {
        timestamp: Date.now(),
        data: action.payload
      };
    },
    setWebsocketChat: (state: AccountStateType, action: PayloadAction<any>) => {
      state.websocketChat = {
        timestamp: Date.now(),
        data: action.payload
      };
    }
  }
});

export const {
  resetState,
  setAccountIdentity,
  setWebsocketEvent,
  setWebsocketStatus,
  setWebsocketNewBets,
  setWebsocketChat
} = accountInfoSlice.actions;

export default accountInfoSlice.reducer;
