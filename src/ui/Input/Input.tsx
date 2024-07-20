import {useState} from 'react';
import style from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label: string;
}

export const Input = ({
  className = '',
  name,
  label,
  type = 'text',
  ...props
}: Props) => {
  const [text, setText] = useState('');

  return (
    <div className={style.formGroup}>
      <label className={style.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={`${style.input} ${className}`}
        type={type}
        value={text}
        onChange={(e) => setText(e.target.value)}
        {...props}
      />
    </div>
  );
};
