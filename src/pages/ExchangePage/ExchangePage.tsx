import style from './ExchangePage.module.scss';

import TopInfo from '../../components/Main/TopInfo';
import ExchangeBalance from '../../components/Main/Exchange/ExchangeBalance';
import ExchangeForm from '../../components/Main/Exchange/ExchangeForm';
import ExchangeRate from '../../components/Main/Exchange/ExchangeRate';

export const ExchangePage = () => {
  return (
    <>
      <TopInfo className={style.block}>
        <h1>Обмен валюты</h1>
      </TopInfo>

      <div className={style.exchangeContainer}>
        <ExchangeRate />
        <ExchangeForm />
        <ExchangeBalance />
      </div>
    </>
  );
};
