import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import accountsReducer from './accounts/accountsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  accounts: accountsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
