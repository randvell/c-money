import style from './Text.module.scss';

interface Props {
  className?: string;
  children: string;
  As?: React.ElementType;
}

export const Text: React.FC<Props> = ({
  className = '',
  children,
  As = 'p',
  ...props
}) => {
  const Component = As;

  return (
    <Component className={`${style.text} ${className}`} {...props}>
      {children}
    </Component>
  );
};
