import style from './AccountTransferForm.module.scss';

import {FormEvent, useState} from 'react';
import Input from '../../../../ui/Input';
import Button from '../../../../ui/Button';
import TopInfo from '../../TopInfo';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store';
import {useParams} from 'react-router-dom';
import {transferFunds} from '../../../../store/transfer/transferAction';
import {ActionState} from '../../../../store/cont';

export const AccountTransferForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {id: from} = useParams();
  const {status, error} = useSelector((state: RootState) => state.transfer);
  const [validationError, setValidationError] = useState('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const requestData = {
      to: formData.get('account') as string,
      amount: Number(formData.get('amount')),
      from: from || '',
    };

    if (!requestData.to) {
      setValidationError('Не введен адрес для отправки средств');
      return;
    }
    if (requestData.amount <= 0) {
      setValidationError('Сумма не может быть меньше или равна нулю');
      return;
    }
    if (!requestData.from) {
      setValidationError('Не обнаружен аккаунт для отправки средств');
      return;
    }

    dispatch(transferFunds(requestData));
  };

  return (
    <div className={style.container}>
      <TopInfo>
        <h2 className={style.heading}>Перевод</h2>
      </TopInfo>

      <form className={style.form} onSubmit={handleSubmit}>
        <Input name="account" label="Счет" required />
        <Input name="amount" label="Сумма" required />
        <div className={style.btnContainer}>
          {(error || validationError) && (
            <span className={style.error}>{error || validationError}</span>
          )}
          <Button
            className={style.button}
            disabled={status === ActionState.Loading}
          >
            {status === ActionState.Loading ? 'Загрузка...' : 'Перевести'}
          </Button>
        </div>
      </form>
    </div>
  );
};
