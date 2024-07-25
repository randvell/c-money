import {createSlice} from '@reduxjs/toolkit';
import {ActionState} from '../cont';
import {transferFunds} from './transferAction';

export interface AuthState {
  status: ActionState;
  error: string | null;
}

const initialState: AuthState = {
  status: ActionState.Idle,
  error: null,
};

const transferSlice = createSlice({
  name: 'transfer-funds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(transferFunds.pending, (state) => {
        state.status = ActionState.Loading;
        state.error = null;
      })
      .addCase(transferFunds.fulfilled, (state) => {
        state.status = ActionState.Succeeded;
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.status = ActionState.Failed;
        state.error = action.payload as string;
      });
  },
});

export default transferSlice.reducer;
