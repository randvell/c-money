import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import accountsReducer from './accounts/accountsSlice';
import transferReducer from './transfer/transferSlice';
import exchangeReducer from './exchange/exchangeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
  transfer: transferReducer,
  exchange: exchangeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
