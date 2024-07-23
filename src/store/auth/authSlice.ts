import {createSlice} from '@reduxjs/toolkit';
import {loginFetch} from './authAction';

export interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initStorage(state) {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.status = 'succeeded';
      }
    },
    logout(state) {
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginFetch.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginFetch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(loginFetch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {logout, initStorage} = authSlice.actions;

export default authSlice.reducer;
