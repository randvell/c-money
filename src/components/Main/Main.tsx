import style from './Main.module.scss';

// import LoginForm from './LoginForm';
import Container from '../Container';
import AccountControl from './AccountControl';
import AccountList from './AccountList';

interface Props {
  children?: React.ReactNode;
}

export const Main = ({children}: Props) => {
  console.log();
  return (
    <main className={style.main}>
      <Container className={style.container}>
        <AccountControl />
        <AccountList />
        {/* <LoginForm /> */}
        {/* children */}
      </Container>
    </main>
  );
};
