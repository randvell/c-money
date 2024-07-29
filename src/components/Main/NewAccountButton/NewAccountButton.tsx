import style from './NewAccountButton.module.scss';

import {SyntheticEvent} from 'react';
import Button from '../../../ui/Button';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {ActionState} from '../../../store/cont';
import {accountCreate} from '../../../store/accounts/accountsAction';

export const NewAccountButton = () => {
  const {createStatus, createError} = useSelector(
    (state: RootState) => state.accounts
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(accountCreate());
  };

  return (
    <div className={style.container}>
      <Button
        onClick={handleClick}
        disabled={createStatus !== ActionState.Idle}
      >
        <span>
          {createStatus === ActionState.Loading
            ? 'Загрузка...'
            : 'Открыть новый счет'}
        </span>
      </Button>

      {!!createError && <p className={style.error}>{createError}</p>}
    </div>
  );
};
