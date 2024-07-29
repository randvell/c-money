import Text from '../../../../ui/Text';
import TopInfo from '../../TopInfo';
import style from './AccountChart.module.scss';

export const AccountChart = () => {
  return (
    <div className={style.container}>
      <TopInfo>
        <span>Динамика</span>
        <Text>2024</Text>
        <Text>Год</Text>
      </TopInfo>
    </div>
  );
};
