import style from './AccountList.module.scss';

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BarLoader} from 'react-spinners';
import {Account} from './Account/Account';
import Text from '../../../../ui/Text';
import TopInfo from '../../TopInfo';
import {AppDispatch, RootState} from '../../../../store/store';
import {accountsFetch} from '../../../../store/accounts/accountsAction';
import {ActionState} from '../../../../store/cont';
import {selectSortedAccounts} from '../../../../store/accounts/accountsSelector';
import AccountSorting from './AccountSorting';

export const AccountList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {status, error} = useSelector((state: RootState) => state.accounts);
  const {status: authStatus} = useSelector((state: RootState) => state.auth);
  const authSuccess = authStatus === ActionState.Succeeded;
  const sortedAccounts = useSelector(selectSortedAccounts);

  useEffect(() => {
    if (authSuccess) {
      dispatch(accountsFetch());
    }
  }, [authSuccess, dispatch]);

  return (
    <div className={style.accountContainer}>
      <TopInfo className={style.tableHeading}>
        <h2 className={style.heading}>Мои счета</h2>
        <AccountSorting />
      </TopInfo>

      <ul className={style.list}>
        {error && <h2>Ошибка при загрузке счетов: {error}</h2>}

        {status === ActionState.Loading && (
          <>
            <BarLoader color="#b865d6" />
            <Text>Загрузка...</Text>
          </>
        )}

        {status === 'succeeded' &&
          sortedAccounts.map((account) => (
            <Account key={account.account} account={account} />
          ))}
      </ul>
    </div>
  );
};
