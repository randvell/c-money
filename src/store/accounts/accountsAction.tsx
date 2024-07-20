export interface ITransactions {
  [key: number]: ITransaction;
}

export interface ITransaction {
  date: string;
  from: string;
  to: string;
  amount: number;
}

export interface IAccounts {
  [key: string]: IAccount;
}

export interface IAccount {
  account: string;
  balance: number;
  mine: boolean;
  transactions: Array<ITransaction>;
  date?: string;
}
