import NewAccountButton from '../../NewAccountButton';
import TopInfo from '../../TopInfo';
import style from './AccountControl.module.scss';

export const AccountControl = () => {
  return (
    <TopInfo className={style.block}>
      <h1 className={style.heading}>Здравствуйте, %username%!</h1>
      <NewAccountButton />
    </TopInfo>
  );
};
