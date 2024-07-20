import Logo from '../../ui/Logo';
import Container from '../Container';
import style from './Footer.module.scss';

export const Footer = () => {
  console.log();
  return (
    <footer className={style.footer}>
      <Container className={style.container}>
        <Logo />
        <span>© C-Money, 2022</span>
      </Container>
    </footer>
  );
};
