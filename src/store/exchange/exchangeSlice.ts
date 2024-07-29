import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {balanceFetch, exchangeProcess} from './exchangeAction';
import {ActionState} from '../cont';

interface CurrencyDetails {
  amount: number;
  code: string;
}

interface ExchangeState {
  rates: IExchangeRate[];
  balance: CurrencyDetails[] | null;
  balanceStatus: ActionState;
  error: string | null;
  exchangeStatus: ActionState;
  exchangeError: string | null;
}

const initialState: ExchangeState = {
  rates: [],
  balance: null,
  error: null,
  balanceStatus: ActionState.Idle,
  exchangeStatus: ActionState.Idle,
  exchangeError: null,
};

interface IExchangeRate {
  from: string;
  to: string;
  rate: number;
  change: number;
}

const exchangeSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    updateExchangeRate(state, action: PayloadAction<IExchangeRate>) {
      const {from, to, rate, change} = action.payload;
      const existingRateIndex = state.rates.findIndex(
        (r) => r.from === from && r.to === to
      );

      if (existingRateIndex !== -1) {
        state.rates.splice(existingRateIndex, 1);
      } else if (state.rates.length === 8) {
        state.rates.pop();
      }

      state.rates.unshift({from, to, rate, change});
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(balanceFetch.pending, (state) => {
        state.balanceStatus = ActionState.Loading;
        state.error = null;
      })
      .addCase(balanceFetch.fulfilled, (state, action) => {
        state.balanceStatus = ActionState.Succeeded;
        state.balance = Object.values(action.payload);
      })
      .addCase(balanceFetch.rejected, (state, action) => {
        state.balanceStatus = ActionState.Failed;
        state.error = action.payload as string;
      })
      .addCase(exchangeProcess.pending, (state) => {
        state.exchangeStatus = ActionState.Loading;
        state.exchangeError = null;
      })
      .addCase(exchangeProcess.fulfilled, (state, action) => {
        state.exchangeStatus = ActionState.Succeeded;
        state.balance = Object.values(action.payload);
      })
      .addCase(exchangeProcess.rejected, (state, action) => {
        state.exchangeStatus = ActionState.Failed;
        state.exchangeError = action.payload as string;
      });
  },
});

export const {updateExchangeRate} = exchangeSlice.actions;

export default exchangeSlice.reducer;
