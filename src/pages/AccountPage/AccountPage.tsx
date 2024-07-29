import style from './AccountPage.module.scss';

import {useNavigate, useParams} from 'react-router-dom';
import TopInfo from '../../components/Main/TopInfo';
import Button from '../../ui/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {useEffect} from 'react';
import {BarLoader} from 'react-spinners';
import Text from '../../ui/Text';
import AccountChart from '../../components/Main/Account/AccountChart';
import AccountStats from '../../components/Main/Account/AccountStats';
import AccountTransactions from '../../components/Main/Account/AccountTransactions';
import AccountTransferForm from '../../components/Main/Account/AccountTransferForm';
import {ActionState} from '../../store/cont';
import {accountFetch} from '../../store/accounts/accountsAction';

export const AccountPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {id: accountId} = useParams();
  const accountsState = useSelector((state: RootState) => state.accounts);
  const fetchStatus = accountsState.fetchStatus;
  const account = accountsState.current;

  useEffect(() => {
    if (
      accountId &&
      account?.account !== accountId &&
      fetchStatus !== ActionState.Loading
    ) {
      dispatch(accountFetch(accountId));
    }
  }, [accountId, fetchStatus, dispatch, account?.account]);

  return (
    <>
      <TopInfo className={style.block}>
        {account?.account !== accountId ||
          (fetchStatus === 'loading' && (
            <>
              <BarLoader color="#b865d6" />
              <Text>Загрузка...</Text>
            </>
          ))}

        {fetchStatus === 'failed' && (
          <h2 className={style.error}>Не удалось загрузить счет</h2>
        )}

        {!!account && <h2>Счет №{accountId}</h2>}

        <Button className={style.btn} onClick={() => navigate('/accounts')}>
          <svg
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.83 5.5L7.41 1.91L6 0.5L0 6.5L6 12.5L7.41 11.09L3.83 7.5L16 7.5V5.5L3.83 5.5Z"
              fill="white"
            />
          </svg>

          {'Вернуться'}
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
