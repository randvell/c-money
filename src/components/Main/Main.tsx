import style from './Main.module.scss';
import Container from '../Container';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const Main = ({children, className = ''}: Props) => {
  console.log();
  return (
    <div className={`${style.main} ${className}`}>
      <Container className={style.container}>{children}</Container>
    </div>
  );
};
