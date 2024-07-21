import style from './NewAccountButton.module.scss';

import {SyntheticEvent} from 'react';
import Button from '../../../ui/Button';

export const NewAccountButton = () => {
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Button size="small" onClick={handleClick}>
      Открыть новый счет
    </Button>
  );
};
