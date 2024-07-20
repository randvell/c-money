import style from './AccountControl.module.scss';

import Button from '../../../ui/Button';
import TopInfo from '../TopInfo';

export const AccountControl = () => {
  const handleClick = () => {};

  return (
    <TopInfo className={style.block}>
      <h1>Здравствуйте, %username%!</h1>
      <Button className={`${style.btn} small`} size='small' onClick={handleClick}>
        Открыть новый счет
      </Button>
    </TopInfo>
  );
};
