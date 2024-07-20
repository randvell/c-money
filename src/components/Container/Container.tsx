import style from './Container.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({children, className = ''}: Props) => (
  <div className={`${style.container} ${className}`}>{children}</div>
);
