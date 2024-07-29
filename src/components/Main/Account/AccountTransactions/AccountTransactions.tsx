import style from './AccountTransactions.module.scss';

import {IAccount} from '../../../../store/accounts/accountsAction';
import {formatDateShort} from '../../../../utils/formatDateShort';

interface Props {
  account: IAccount;
}

export const AccountTransactions = ({account}: Props) => {
  const transactions = (account.transactions || []).slice(-9);

  return (
    <div className={style.container}>
      <h2 className={style.heading}>История переводов</h2>

      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th>Счет</th>
            <th>Сумма</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, i) => (
            <tr key={i}>
              <td>{transaction.to}</td>
              <td
                className={
                  transaction.to !== account.account
                    ? style.spendingTransaction
                    : ''
                }
              >
                {`${transaction.to !== account.account ? '-' : '+'}${
                  transaction.amount
                }`}
              </td>
              <td>{formatDateShort(transaction.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
