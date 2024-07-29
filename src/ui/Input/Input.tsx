import style from './Input.module.scss';

import {ChangeEvent, useState} from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label: string;
  mask?: null | RegExp;
  fieldSize?: 'big' | 'normal' | 'small';
}

export const Input = ({
  className = '',
  name,
  label,
  type = 'text',
  fieldSize = 'normal',
  mask = null,
  ...props
}: InputProps) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const validateText = (value: string) => {
    if (mask && !mask.test(value)) {
      setError('Некорректный ввод');
    } else {
      setError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentText = e.target.value;
    setText(currentText);
    setError('');

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeoutId = setTimeout(() => validateText(currentText), 300);
    setTypingTimeout(timeoutId);
  };

  return (
    <div className={`${style.formGroup}`}>
      <label className={style.label} htmlFor={name}>
        {label}
      </label>
      <p className={style.error}>{error}</p>
      <input
        className={`${style.input} ${className} ${style[`i-${fieldSize}`]}`}
        name={name}
        type={type}
        value={text}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export interface KeyValuePair {
  key: string;
  value: string;
}

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label: string;
  options: KeyValuePair[];
  fieldSize?: 'big' | 'normal' | 'small';
}

export const Select = ({
  className = '',
  name,
  label,
  options,
  fieldSize = 'normal',
}: SelectProps) => {
  const [selected, setSelected] = useState('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className={style.formGroup}>
      <p className={style.label}>{label}</p>
      <select
        className={`${style.input} ${className} ${style[`i-${fieldSize}`]}`}
        name={name}
        value={selected}
        onChange={handleChange}
      >
        <option value="">--Select option--</option>
        {options.map(({key, value}) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
