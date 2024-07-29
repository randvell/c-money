import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const compareAccountNumbers = (a: string | number, b: string | number) => {
  const numA = typeof a === 'string' ? parseInt(a.replace(/\D/g, ''), 10) : a;
  const numB = typeof b === 'string' ? parseInt(b.replace(/\D/g, ''), 10) : b;

  return numA - numB;
};

export const selectSortedAccounts = createSelector(
  (state: RootState) => state.accounts.list,
  (state: RootState) => state.accounts.sortOption,
  (accounts, sortOption) => {
    return [...accounts].sort((a, b) => {
      switch (sortOption) {
        case 'acc_num':
          return compareAccountNumbers(a.account, b.account);
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'balance':
          return b.balance - a.balance;
        case 'lastTransaction':
          return (
            new Date(b.transactions[0]?.date).getTime() -
            new Date(b.transactions[0]?.date).getTime()
          );
        default:
          return 0;
      }
    });
  }
);
