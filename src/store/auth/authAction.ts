import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '../store';
import {API_URL} from '../../const';

export interface ILoginFetch {
  login: string;
  password: string;
}

export const loginFetch = createAsyncThunk(
  'auth/login',
  async ({login, password}: ILoginFetch, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        return rejectWithValue('Вы уже авторизованы');
      }

      const response = await axios.post(`${API_URL}/login`, {login, password});
      const {payload, error} = response.data;
      if (error) {
        return rejectWithValue(error);
      }

      return payload.token;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          return rejectWithValue(err.response.data.error);
        }
      }

      return rejectWithValue('Something went wrong');
    }
  }
);
