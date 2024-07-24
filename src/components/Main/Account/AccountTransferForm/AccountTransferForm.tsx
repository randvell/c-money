import style from './AccountTransferForm.module.scss';

import {FormEvent} from 'react';
import Input from '../../../../ui/Input';
import Button from '../../../../ui/Button';
import TopInfo from '../../TopInfo';

export const AccountTransferForm = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={style.container}>
      <TopInfo>
        <h2 className={style.heading}>Перевод</h2>
      </TopInfo>

      <form className={style.form} onSubmit={handleSubmit}>
        <Input name="account" label="Счет" />
        <Input name="amount" label="Сумма" />
        <div className={style.btnContainer}>
          <span className={style.error}>error</span>
          <Button className={style.button}>Перевести</Button>
        </div>
      </form>
    </div>
  );
};
