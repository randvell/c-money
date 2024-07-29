import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import axios from 'axios';
import {API_URL} from '../../const';

export interface ITransaction {
  date: string;
  from: string;
  to: string;
  amount: number;
}

export interface IAccount {
  account: string;
  balance: number;
  mine: boolean;
  transactions: Array<ITransaction>;
  date: string;
  isSynced?: null | true;
}

export const accountsFetch = createAsyncThunk(
  'accounts/fetch',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Необходимо авторизоваться');
      }

      const url = `${API_URL}/accounts`;
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

export const accountFetch = createAsyncThunk(
  'account/fetch',
  async (id: string, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Необходимо авторизоваться');
      }

      const url = `${API_URL}/account/${id}`;
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

export const accountCreate = createAsyncThunk(
  'accounts/create',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Необходимо авторизоваться');
      }

      const url = `${API_URL}/create-account`;
      const response = await axios.post(
        url,
        {},
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

interface ITransferRequest {
  from: string;
  to: string;
  amount: number;
}

export const transferFunds = createAsyncThunk(
  'transfer-funds',
  async ({from, to, amount}: ITransferRequest, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Вы не авторизованы');
      }

      const response = await axios.post(
        `${API_URL}/transfer-funds`,
        {
          from,
          to,
          amount,
        },
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
