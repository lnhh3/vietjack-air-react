import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

import useThemeMode from '@/store/useThemeMode';

import PuffLoader from '../loading/PuffLoader';
import styles from './button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button = ({ loading = false, disabled, className, children, ...rest }: ButtonProps) => {
  const theme = useThemeMode();
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={clsx(
        styles.container,
        disabled && styles.disabled,
        theme === 'dark' && styles.dark,
        className
      )}
    >
      {loading ? <PuffLoader color={theme === 'light' ? '#ffffff' : '#000000'} /> : children}
    </button>
  );
};
export default Button;
