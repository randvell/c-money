import Logo from '../../ui/Logo';
import Container from '../Container';
import style from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={style.footer}>
      <Container className={style.container}>
        <Logo />
        <span>© C-Money, 2022</span>
      </Container>
    </div>
  );
};
