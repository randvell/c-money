import style from './AccountList.module.scss';

import {Account} from './Account/Account';
import Text from '../../../../ui/Text';
import TopInfo from '../../TopInfo';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store';
import {BarLoader} from 'react-spinners';
import {useEffect} from 'react';
import {accountsFetch} from '../../../../store/accounts/accountsAction';

export const AccountList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.accounts);
  const status = state.status;
  const accounts = state.list;
  const error = state.error;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(accountsFetch());
    }
  }, [status, dispatch]);

  return (
    <div className={style.accountContainer}>
      <TopInfo className={style.tableHeading}>
        <h2 className={style.heading}>Мои счета</h2>
        {!!accounts.length && (
          <div className={style.sortingContainer}>
            <Text>Сортировка:</Text>
            <p className={style.sortingType}>По дате</p>
          </div>
        )}
      </TopInfo>

      <ul className={style.list}>
        {error && <h2>Ошибка при загрузке счетов: {error}</h2>}

        {status === 'loading' && (
          <>
            <BarLoader color="#b865d6" />
            <Text>Загрузка...</Text>
          </>
        )}

        {status === 'succeeded' &&
          accounts.map((account) => (
            <Account key={account.account} account={account} />
          ))}
      </ul>
    </div>
  );
};
