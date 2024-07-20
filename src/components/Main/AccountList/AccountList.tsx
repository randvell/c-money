import style from './AccountList.module.scss';

import {accounts} from '../../../store/accounts/accountsSlice';
import {Account} from './Account/Account';
import Text from '../../../ui/Text';
import TopInfo from '../TopInfo';

export const AccountList: React.FC = () => {
  console.log(accounts);
  return (
    <div className={style.accountContainer}>
      <TopInfo className={style.tableHeading}>
        <h2 className={style.heading}>Мои счета</h2>
        <div className={style.sortingContainer}>
          <Text>Сортировка:</Text>
          <p className={style.sortingType}>По дате</p>
        </div>
      </TopInfo>

      <ul className={style.list}>
        {Object.entries(accounts).map(([key, account]) => (
          <Account key={key} account={account} />
        ))}
      </ul>
    </div>
  );
};
