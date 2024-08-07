import style from './TopMenu.module.scss';

import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../store/auth/authSlice';
import {RootState} from '../../../store/store';
import PageLink from '../../../ui/PageLink';

export const TopMenu = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) {
    return (
      <Link className={style.link} to="/auth">
        Авторизация
      </Link>
    );
  }

  return (
    <ul className={style.list}>
      <li className={style.item}>
        <PageLink className={style.link} to="/accounts">
          Счета
        </PageLink>
      </li>
      <li className={style.item}>
        <PageLink className={style.link} to="/exchange">
          Обмен
        </PageLink>
      </li>
      <li className={style.item} onClick={handleLogout}>
        <button className={`${style.link} ${style.linkBtn}`}>
          <span>Выйти</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5675 9.6925L6.625 10.75L10.375 7L6.625 3.25L5.5675 4.3075L7.5025 6.25H0.25V7.75H7.5025L5.5675 9.6925ZM12.25 0.25H1.75C0.9175 0.25 0.25 0.925 0.25 1.75V4.75H1.75V1.75H12.25V12.25H1.75V9.25H0.25V12.25C0.25 13.075 0.9175 13.75 1.75 13.75H12.25C13.075 13.75 13.75 13.075 13.75 12.25V1.75C13.75 0.925 13.075 0.25 12.25 0.25Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </li>
    </ul>
  );
};
