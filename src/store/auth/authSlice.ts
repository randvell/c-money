import {createSlice} from '@reduxjs/toolkit';
import {loginFetch} from './authAction';
import {ActionState} from '../cont';

export interface AuthState {
  token: string | null;
  status: ActionState;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: ActionState.Idle,
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
        state.status = ActionState.Succeeded;
      } else {
        state.status = ActionState.Failed;
      }
    },
    logout(state) {
      state.token = null;
      state.status = ActionState.Idle;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginFetch.pending, (state) => {
        state.status = ActionState.Loading;
        state.error = null;
      })
      .addCase(loginFetch.fulfilled, (state, action) => {
        state.status = ActionState.Succeeded;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(loginFetch.rejected, (state, action) => {
        state.status = ActionState.Failed;
        state.error = action.payload as string;
      });
  },
});

export const {logout, initStorage} = authSlice.actions;

export default authSlice.reducer;
