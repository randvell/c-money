import style from './AccountControl.module.scss';

import TopInfo from '../TopInfo';
import NewAccountButton from '../NewAccountButton';

export const AccountControl = () => {
  return (
    <TopInfo className={style.block}>
      <h1>Здравствуйте, %username%!</h1>
      <NewAccountButton />
    </TopInfo>
  );
};
