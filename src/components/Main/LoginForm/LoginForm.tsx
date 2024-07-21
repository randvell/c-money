import style from './LoginForm.module.scss';

import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {loginFetch} from '../../../store/auth/authAction';

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {status, error} = useSelector((state: RootState) => state.auth);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError('');

    const formData = new FormData(e.currentTarget);
    const loginData = {
      login: formData.get('login') as string,
      password: formData.get('password') as string,
    };

    if (!loginData.login || !loginData.password) {
      setValidationError('Не заполнены обязательные поля');
      return;
    }

    dispatch(loginFetch(loginData));
  };

  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.header}>Вход в аккаунт</h1>

        <Input name="login" label="Логин" />
        <Input name="password" label="Пароль" type="password" />

        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Загрузка...' : 'Войти'}
        </Button>

        {(error || validationError) && (
          <p className={style.error}>{error || validationError}</p>
        )}
      </form>
    </div>
  );
};
