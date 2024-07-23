import {useNavigate, useParams} from 'react-router-dom';
import TopInfo from '../../components/Main/TopInfo';
import Button from '../../ui/Button';
import style from './AccountPage.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {useEffect} from 'react';
import {accountsFetch} from '../../store/accounts/accountsAction';
import {BarLoader} from 'react-spinners';
import Text from '../../ui/Text';

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

  if (!accountId) {
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
    <TopInfo className={style.block}>
      {status === 'loading' && (
        <>
          <BarLoader color="#b865d6;" />
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
  );
};
