import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountStateType, SetAccountIdentityType } from 'types';

const initialState: AccountStateType = {
  identity: { isFetched: undefined, identity: undefined }
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
    }
  }
});

export const { resetState, setAccountIdentity } = accountInfoSlice.actions;

export default accountInfoSlice.reducer;
