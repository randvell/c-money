import style from './AccountPage.module.scss';

import {useNavigate, useParams} from 'react-router-dom';
import TopInfo from '../../components/Main/TopInfo';
import Button from '../../ui/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {useEffect} from 'react';
import {accountsFetch} from '../../store/accounts/accountsAction';
import {BarLoader} from 'react-spinners';
import Text from '../../ui/Text';
import AccountChart from '../../components/Main/Account/AccountChart';
import AccountStats from '../../components/Main/Account/AccountStats';
import AccountTransactions from '../../components/Main/Account/AccountTransactions';
import AccountTransferForm from '../../components/Main/Account/AccountTransferForm';

export const AccountPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {id: accountId} = useParams();
  const accountsState = useSelector((state: RootState) => state.accounts);
  const status = accountsState.status;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(accountsFetch());
    }
  }, [status, dispatch]);

  const account = accountsState.list.find(
    (account) => account.account === accountId
  );

  if (status === 'succeeded' && !account) {
    return (
      <TopInfo className={style.block}>
        <h2>Такого счета нет</h2>
        <Button size="small" onClick={() => navigate('/accounts/')}>
          {'<- Вернуться'}
        </Button>
      </TopInfo>
    );
  }

  return (
    <>
      <TopInfo className={style.block}>
        {status === 'loading' && (
          <>
            <BarLoader color="#b865d6" />
            <Text>Загрузка...</Text>
          </>
        )}

        {status === 'failed' && (
          <h2 className={style.error}>Не удалось загрузить счет</h2>
        )}

        {status === 'succeeded' && <h2>Счет №{accountId}</h2>}

        <Button size="small" onClick={() => navigate('/accounts')}>
          {'<- Вернуться'}
        </Button>
      </TopInfo>

      {!!account && (
        <div className={style.accountData}>
          <AccountChart />
          <AccountTransactions account={account} />
          <AccountStats />
          <AccountTransferForm />
        </div>
      )}
    </>
  );
};
