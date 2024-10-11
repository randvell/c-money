import {Line} from 'react-chartjs-2';
import 'chart.js/auto'; // This is important for chart.js to work properly
import Text from '../../../../ui/Text';
import TopInfo from '../../TopInfo';
import style from './AccountChart.module.scss';
import {ITransaction} from '../../../../store/accounts/accountsAction';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';

interface BalanceData {
  date: string;
  balance: number;
}

const russianMonths = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const processTransactions = (
  account: string,
  initialBalance: number,
  transactions: ITransaction[]
): BalanceData[] => {
  if (transactions.length === 0) {
    return [];
  }

  const balanceData: BalanceData[] = [];

  let balance = initialBalance;
  let currentDate = new Date();
  let currentMonth = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, '0')}`;

  balanceData.push({date: currentMonth, balance: balance});

  transactions.reverse().forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const yearMonth = `${transactionDate.getFullYear()}-${String(
      transactionDate.getMonth() + 1
    ).padStart(2, '0')}`;

    if (yearMonth !== currentMonth) {
      if (balanceData[0]?.date !== currentMonth) {
        balanceData.push({date: currentMonth, balance: balance});
      }

      currentMonth = yearMonth;
    }

    if (transaction.from === account) {
      balance += transaction.amount;
    } else {
      balance -= transaction.amount;
    }
  });

  const lastTransaction = transactions[transactions.length - 1];
  let lastTransactionDate = new Date(lastTransaction.date);
  lastTransactionDate.setMonth(lastTransactionDate.getMonth());
  const yearMonth = `${lastTransactionDate.getFullYear()}-${String(
    lastTransactionDate.getMonth() + 1
  ).padStart(2, '0')}`;

  balanceData.push({date: yearMonth, balance: 0});

  return balanceData.reverse();
};

export const AccountChart: React.FC = () => {
  const [balanceData, setBalanceData] = useState<BalanceData[]>([]);
  const current = useSelector((state: RootState) => state.accounts.current);
  const account = current?.account;
  const balance = current?.balance;
  const transactions = current?.transactions;

  useEffect(() => {
    if (account && balance && transactions) {
      const data = processTransactions(
        account,
        balance,
        Object.values(transactions)
      );
      setBalanceData(data);
    }
  }, [transactions, balance, account]);

  const chartData = {
    labels: balanceData.map((data) => {
      const [year, month] = data.date.split('-');
      return `${russianMonths[parseInt(month, 10) - 1]} ${year}`;
    }),
    datasets: [
      {
        label: 'Баланс счета',
        data: balanceData.map((data) => data.balance),
        borderColor: '#B865D6',
        fill: true,
      },
    ],
  };

  return (
    <div className={style.container}>
      <TopInfo>
        <span>Динамика</span>
        <Text>Год</Text>
      </TopInfo>
      <Line data={chartData} />
    </div>
  );
};
