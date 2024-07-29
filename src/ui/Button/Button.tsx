import style from './Button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'normal' | 'big';
}

export const Button: React.FC<Props> = ({
  className = '',
  children: text,
  size = 'normal',
  ...props
}: Props) => {
  return (
    <button
      className={`${style.btn} ${className} ${style[`b-${size}`]}`}
      {...props}
    >
      {text}
    </button>
  );
};
