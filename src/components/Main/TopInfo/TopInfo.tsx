import style from './TopInfo.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const TopInfo = ({children, className = ''}: Props) => {
  return <div className={`${style.container} ${className}`}>{children}</div>;
};
