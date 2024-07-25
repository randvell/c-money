import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import axios from 'axios';
import {API_URL} from '../../const';

interface IRequest {
  from: string;
  to: string;
  amount: number;
}

export const transferFunds = createAsyncThunk(
  'transfer-funds',
  async ({from, to, amount}: IRequest, {getState, rejectWithValue}) => {
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
