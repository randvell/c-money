import style from './LoginForm.module.scss';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';

export const LoginForm = () => {
  const handleSubmit = () => {};

  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.header}>Вход в аккаунт</h1>

        <Input name="login" label="Логин" />
        <Input name="password" label="Пароль" type="password" />

        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
};
