import Logo from '../../ui/Logo';
import Container from '../Container';
import style from './Header.module.scss';
import TopMenu from './TopMenu';

export const Header = () => {
  console.log();
  return (
    <div className={style.header}>
      <Container className={style.container}>
        <Logo />
        <TopMenu />
      </Container>
    </div>
  );
};
