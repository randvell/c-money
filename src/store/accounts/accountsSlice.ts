import {createSlice} from '@reduxjs/toolkit';
import {accountCreate, accountsFetch, IAccount} from './accountsAction';
import {ActionState} from '../cont';

export interface AccountsState {
  list: IAccount[];
  status: ActionState;
  error: string | null;
  createStatus: ActionState;
  createError: string | null;
}

const initialState: AccountsState = {
  list: [],
  status: ActionState.Idle,
  error: null,
  createStatus: ActionState.Idle,
  createError: null,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(accountsFetch.pending, (state) => {
      state.status = ActionState.Loading;
      state.error = null;
    });
    builder.addCase(accountsFetch.fulfilled, (state, action) => {
      state.status = ActionState.Succeeded;
      state.list = action.payload;
    });
    builder.addCase(accountsFetch.rejected, (state, action) => {
      state.status = ActionState.Failed;
      state.error = action.payload as string;
    });
    builder.addCase(accountCreate.pending, (state) => {
      state.createStatus = ActionState.Loading;
      state.createError = null;
    });
    builder.addCase(accountCreate.fulfilled, (state, action) => {
      state.createStatus = ActionState.Idle;
      state.list.push(action.payload);
    });
    builder.addCase(accountCreate.rejected, (state, action) => {
      state.createStatus = ActionState.Failed;
      state.createError = action.payload as string;
    });
  },
});

export default accountsSlice.reducer;
