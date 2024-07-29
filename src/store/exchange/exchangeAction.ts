import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import axios from 'axios';
import {API_URL} from '../../const';

export const currenciesFetch = createAsyncThunk(
  'all-currencies',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Необходимо авторизоваться');
      }

      const url = `${API_URL}/all-currencies`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      const {payload, error} = response.data;
      if (error) {
        return rejectWithValue(error);
      }

      return payload;
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

export const balanceFetch = createAsyncThunk(
  'currencies',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Необходимо авторизоваться');
      }

      const url = `${API_URL}/currencies`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      const {payload, error} = response.data;
      if (error) {
        return rejectWithValue(error);
      }

      return payload;
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

interface IExchangeRequest {
  from: string;
  to: string;
  amount: number;
}

export const exchangeProcess = createAsyncThunk(
  'currency-buy',
  async ({from, to, amount}: IExchangeRequest, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Необходимо авторизоваться');
      }

      const url = `${API_URL}/currency-buy`;
      const response = await axios.post(
        url,
        {from, to, amount},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      const {payload, error} = response.data;
      if (error) {
        return rejectWithValue(error);
      }

      return payload;
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
