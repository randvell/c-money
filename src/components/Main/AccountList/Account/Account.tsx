import style from './Account.module.scss';

import {IAccount} from '../../../../store/accounts/accountsAction';
import {formatDateShort} from '../../../../utils/formatDateShort';
import Text from '../../../../ui/Text';
import {useNavigate} from 'react-router-dom';

interface Props {
  account: IAccount;
}

export const Account = ({account}: Props) => {
  const navigate = useNavigate();
  const openedDate = account.date ? formatDateShort(account.date) : null;

  let transactionDate = account.transactions?.[0]?.date || null;
  transactionDate = transactionDate ? formatDateShort(transactionDate) : null;

  return (
    <li
      className={style.item}
      tabIndex={0}
      onClick={() => navigate(account.account)}
    >
      <Text className={style.account}>{account.account}</Text>
      <p className={style.balance}>{`${account.balance.toLocaleString()} ₽`}</p>
      {openedDate && (
        <div className={`${style.textBlock} ${style.openedDate}`}>
          <Text>открыт</Text>
          <Text>{openedDate}</Text>
        </div>
      )}
      {transactionDate && (
        <div className={`${style.textBlock} ${style.transactionDate}`}>
          <Text>последняя операция</Text>
          <Text>{transactionDate}</Text>
        </div>
      )}
    </li>
  );
};
