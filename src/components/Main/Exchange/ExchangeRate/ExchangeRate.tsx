import style from './ExchangeRate.module.scss';

import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {API_URL} from '../../../../const';
import {updateExchangeRate} from '../../../../store/exchange/exchangeSlice';
import {RootState} from '../../../../store/store';
import {ReactComponent as IncSvg} from './img/inc.svg';
import {ReactComponent as DecSvg} from './img/dec.svg';

export const ExchangeRate = () => {
  const dispatch = useDispatch();
  const rates = useSelector((state: RootState) => state.exchange.rates);

  useEffect(() => {
    const url = `${API_URL.replace('http', 'ws')}/currency-feed`;

    console.log(url);
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'EXCHANGE_RATE_CHANGE') {
        dispatch(updateExchangeRate(message));
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  return (
    <div className={style.container}>
      <h3 className={style.heading}>
        Изменение курса в режиме реального времени
      </h3>
      <ul className={style.list}>
        {rates.map((rate, index) => (
          <li className={style.item} key={index}>
            <span>
              {rate.from}/{rate.to}
            </span>
            <div className={style.separator}></div>
            <div className={style.change}>
              {`${rate.change > 0 ? '+' : '-'}${rate.rate}`}
              {rate.change > 0 ? <IncSvg /> : rate.change < 0 ? <DecSvg /> : ''}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
