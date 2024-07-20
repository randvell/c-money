import style from './Logo.module.scss';
import {ReactComponent as LogoSvg} from './img/logo.svg';

export const Logo = () => {
  return (
    <div className={style.block}>
      <LogoSvg className={style.img} />
      <span className={style.text}>C-Money</span>
    </div>
  );
};
