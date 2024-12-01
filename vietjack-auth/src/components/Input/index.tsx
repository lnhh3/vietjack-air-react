import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import useThemeMode from '@/store/useThemeMode';

import style from './input.module.scss';

type InputProps = {
  error?: boolean;
  rightComponent?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { error, className, rightComponent, ...restProps } = props;

  const theme = useThemeMode();

  return (
    <div className={clsx(style.container, theme === 'dark' && style.dark, error && style.error)}>
      <input
        spellCheck="false"
        autoComplete="off"
        className={clsx(style.input, className)}
        ref={ref}
        {...restProps}
      />
      {rightComponent}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;
