import style from './PageLink.module.scss';

import {Link, useLocation} from 'react-router-dom';

interface Props {
  className?: string;
  to: string;
  children: string;
}

export const PageLink = ({to, className = '', children}: Props) => {
  const location = useLocation();
  const isCurrent = location.pathname === to;

  return (
    <Link className={`${className} ${isCurrent ? style.current : ''}`} to={to}>
      {children}
    </Link>
  );
};
