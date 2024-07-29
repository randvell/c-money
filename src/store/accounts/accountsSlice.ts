import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  accountCreate,
  accountFetch,
  accountsFetch,
  IAccount,
  transferFunds,
} from './accountsAction';
import {ActionState} from '../cont';

export type SortOption =
  | 'default'
  | 'acc_num'
  | 'date'
  | 'balance'
  | 'lastTransaction';

export interface AccountsState {
  current: IAccount | null;
  list: IAccount[];
  status: ActionState;
  error: string | null;
  transferStatus: ActionState;
  transferError: string | null;
  createStatus: ActionState;
  createError: string | null;
  fetchStatus: ActionState;
  fetchError: string | null;
  sortOption: SortOption;
}

const initialState: AccountsState = {
  current: null,
  list: [],
  status: ActionState.Idle,
  error: null,
  transferStatus: ActionState.Idle,
  transferError: null,
  createStatus: ActionState.Idle,
  createError: null,
  fetchStatus: ActionState.Idle,
  fetchError: null,
  sortOption: 'default',
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(accountsFetch.pending, (state) => {
      state.status = ActionState.Loading;
      state.error = null;
    });
    builder.addCase(accountsFetch.fulfilled, (state, action) => {
      state.status = ActionState.Succeeded;
      state.list = action.payload;
      state.error = null;
    });
    builder.addCase(accountsFetch.rejected, (state, action) => {
      state.status = ActionState.Failed;
      state.error = action.payload as string;
    });
    builder.addCase(accountFetch.pending, (state) => {
      state.fetchStatus = ActionState.Loading;
      state.fetchError = null;
    });
    builder.addCase(accountFetch.fulfilled, (state, action) => {
      state.fetchStatus = ActionState.Idle;
      state.current = action.payload as IAccount;
    });
    builder.addCase(accountFetch.rejected, (state, action) => {
      state.fetchStatus = ActionState.Failed;
      state.fetchError = action.payload as string;
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
    builder.addCase(transferFunds.pending, (state) => {
      state.transferStatus = ActionState.Loading;
      state.transferError = null;
    });
    builder.addCase(transferFunds.fulfilled, (state, action) => {
      state.transferStatus = ActionState.Succeeded;
      if (state.current && action.payload?.transactions) {
        state.current.transactions = action.payload.transactions;
      }
    });
    builder.addCase(transferFunds.rejected, (state, action) => {
      state.transferStatus = ActionState.Failed;
      state.transferError = action.payload as string;
    });
  },
});

export const {setSortOption} = accountsSlice.actions;

export default accountsSlice.reducer;
