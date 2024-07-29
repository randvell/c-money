import style from './Input.module.scss';

import {ChangeEvent, useState} from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label: string;
  fieldSize?: 'big' | 'normal' | 'small';
}

export const Input = ({
  className = '',
  name,
  label,
  type = 'text',
  fieldSize = 'normal',
  ...props
}: InputProps) => {
  const [text, setText] = useState('');

  return (
    <div className={`${style.formGroup}`}>
      <label className={style.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={`${style.input} ${className} ${style[`i-${fieldSize}`]}`}
        name={name}
        type={type}
        value={text}
        onChange={(e) => setText(e.target.value)}
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
  );
};
