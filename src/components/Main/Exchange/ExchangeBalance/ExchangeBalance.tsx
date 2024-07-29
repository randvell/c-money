import style from './ExchangeBalance.module.scss';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store';
import {ActionState} from '../../../../store/cont';
import {BarLoader} from 'react-spinners';
import {useEffect} from 'react';
import {balanceFetch} from '../../../../store/exchange/exchangeAction';
import Text from '../../../../ui/Text';

export const ExchangeBalance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {balance, balanceStatus} = useSelector(
    (state: RootState) => state.exchange
  );

  useEffect(() => {
    if (balance === null && balanceStatus === ActionState.Idle) {
      dispatch(balanceFetch());
    }
  }, [balance, balanceStatus, dispatch]);

  return (
    <div className={style.container}>
      <p className={style.heading}>Мои валюты</p>
      {balanceStatus === ActionState.Loading && (
        <>
          <p>Загрузка...</p>
          <BarLoader />
        </>
      )}

      {balance !== null && (
        <tbody className={style.table}>
          {Object.entries(balance).map(([currency, details]) => (
            <tr key={currency} className={style.row}>
              <td>
                <Text>{details.code}</Text>
              </td>
              <td className={style.amount}>
                {Math.round(details.amount * 100)}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </div>
  );
};
