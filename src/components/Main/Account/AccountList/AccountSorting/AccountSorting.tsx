import style from './AccountSorting.module.scss';

import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../../store/store';
import {
  setSortOption,
  SortOption,
} from '../../../../../store/accounts/accountsSlice';
import Text from '../../../../../ui/Text';

export const AccountSorting = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.accounts);

  const sortOption = state.sortOption;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortChange = (option: SortOption) => {
    dispatch(setSortOption(option));
    setIsDropdownOpen(false);
  };

  const getSortOptionText = (option: SortOption) => {
    switch (option) {
      case 'default':
        return 'Нет';
      case 'date':
        return 'Дата создания';
      case 'balance':
        return 'Баланс';
      case 'lastTransaction':
        return 'Последняя транзакция';
      default:
        return 'Выберите опцию';
    }
  };

  return (
    <div className={style.sortingContainer}>
      <Text>Сортировка:</Text>
      <div className={style.dropdownWrapper}>
        <button onClick={toggleDropdown} className={style.dropdownToggle}>
          {getSortOptionText(sortOption)}
          <span>▼</span>
        </button>
        {isDropdownOpen && (
          <div className={style.dropdownMenu}>
            <button onClick={() => handleSortChange('default')}>Нет</button>
            <button onClick={() => handleSortChange('acc_num')}>
              Номер счета
            </button>
            <button onClick={() => handleSortChange('date')}>
              Дата открытия счета
            </button>
            <button onClick={() => handleSortChange('balance')}>Баланс</button>
            <button onClick={() => handleSortChange('lastTransaction')}>
              Последняя транзакция
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
