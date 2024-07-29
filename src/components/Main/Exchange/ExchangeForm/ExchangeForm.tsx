import style from './ExchangeForm.module.scss';

import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../../ui/Button';
import Input from '../../../../ui/Input';
import {FormEvent, useState} from 'react';
import {AppDispatch, RootState} from '../../../../store/store';
import {ActionState} from '../../../../store/cont';
import {exchangeProcess} from '../../../../store/exchange/exchangeAction';
import {KeyValuePair, Select} from '../../../../ui/Input/Input';

export const ExchangeForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {exchangeStatus, exchangeError, balance} = useSelector(
    (state: RootState) => state.exchange
  );

  const [validationError, setValidationError] = useState('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError('');

    const formData = new FormData(e.currentTarget);
    const requestData = {
      from: formData.get('from') as string,
      to: formData.get('to') as string,
      amount: Number(formData.get('amount')),
    };

    if (Number.isNaN(requestData.amount)) {
      setValidationError('Введите корректную сумму');
      return;
    }
    if (requestData.amount <= 0) {
      setValidationError('Сумма не может быть меньше или равна нулю');
      return;
    }
    if (!requestData.to || !requestData.from) {
      setValidationError('Не заполнены обязательные поля');
      return;
    }

    dispatch(exchangeProcess(requestData));
  };

  const options: KeyValuePair[] = (balance || []).map((current) => ({
    key: current.code,
    value: current.code,
  }));

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h3 className={style.heading}>Обмен валюты</h3>

      <div className={style.inputContainer}>
        <Select
          options={options}
          name="from"
          label="Откуда"
          fieldSize="small"
          required
        />
        <Select
          options={options}
          name="to"
          label="Куда"
          fieldSize="small"
          required
        />
        <Input name="amount" label="Сумма" fieldSize="small" required />

        <span className={style.error}>{exchangeError || validationError}</span>

        <Button
          size="small"
          className={style.button}
          disabled={exchangeStatus === ActionState.Loading}
        >
          {exchangeStatus === ActionState.Loading ? 'Загрузка...' : 'Обменять'}
        </Button>
      </div>
    </form>
  );
};
