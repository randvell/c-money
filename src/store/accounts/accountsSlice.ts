import {createSlice} from '@reduxjs/toolkit';
import {accountsFetch, IAccount} from './accountsAction';

export interface AccountsState {
  list: IAccount[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AccountsState = {
  list: [],
  status: 'idle',
  error: null,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(accountsFetch.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(accountsFetch.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.list = action.payload;
    });
    builder.addCase(accountsFetch.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

export default accountsSlice.reducer;
