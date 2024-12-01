import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import Spinner from '@/components/common/Spinner';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  THIRD = 'third',
  PRIMARY_ORANGE = 'primary-orange',
  NAV = 'nav',
  ERROR = 'error',
  SUCCESS = 'success',
}

interface ButtonProps extends React.AllHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  topCenterIcon?: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  sizeButton?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  buttonType?: ButtonType;
  small?: boolean;
  large?: boolean;
  isFullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      type = 'button',
      sizeButton = 'md',
      className = '',
      buttonType = 'primary',
      disabled = false,
      loading = false,
      buttonRef,
      leftIcon,
      rightIcon,
      topCenterIcon,
      isFullWidth = false,
      // ...rest
    },
    ref
  ) => {
    const baseButtonClass =
      'drop-shadow-sm rounded-md focus:outline-none flex flex-row items-center justify-center';

    const sizeClasses = {
      sm: 'px-[14px] py-2',
      md: 'px-4 py-2.5',
      lg: 'px-[18px] py-[10px]',
      xl: 'px-5 py-3',
      '2xl': 'px-7 py-4',
    } as const;

    const buttonsClasses = {
      [ButtonType.PRIMARY]: `${
        !(disabled || loading)
          ? 'bg-primary-600 dark:bg-red-500 text-white border border-primary-600'
          : 'bg-primary-200 text-white border border-primary-200 cursor-not-allowed'
      }`,
      [ButtonType.PRIMARY_ORANGE]: `${
        !(disabled || loading)
          ? 'bg-orange-600 border border-orange-600 text-gray-900'
          : 'bg-orange-200 border border-orange-200 text-gray-900 cursor-not-allowed'
      }`,
      [ButtonType.SECONDARY]: `${
        !(disabled || loading)
          ? 'bg-white text-gray-700 border border-gray-300'
          : 'bg-white text-gray-300 border border-gray-200 cursor-not-allowed'
      }`,
      [ButtonType.THIRD]: `${
        !(disabled || loading)
          ? 'bg-primary-50 border border-primary-50 text-primary-700'
          : 'bg-primary-25 border border-primary-25 text-primary-400 cursor-not-allowed'
      }`,
      [ButtonType.NAV]: `${!(disabled || loading) ? 'text-primary-50' : 'cursor-not-allowed'}`,
      [ButtonType.SUCCESS]: `${
        !(disabled || loading)
          ? 'bg-success-600 text-white border border-success-600'
          : 'bg-success-200 text-white border border-success-200 cursor-not-allowed'
      }`,
      [ButtonType.ERROR]: `${
        !(disabled || loading)
          ? 'bg-error-600 text-white border border-error-600'
          : 'bg-error-200 text-white border border-error-200 cursor-not-allowed'
      }`,
    };

    const buttonClasses = twMerge(
      baseButtonClass,
      sizeClasses[sizeButton],
      // @ts-ignore
      buttonsClasses[buttonType],
      className
    );

    return (
      <motion.button
        // initial={{ scale: 1 }}
        // whileHover={{
        //   scale: disabled || loading ? 1 : 1.05,
        // }}
        // whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
        // transition={{ duration: 0.5, type: 'spring' }}
        onClick={onClick}
        type={type}
        disabled={disabled || loading}
        ref={buttonRef || ref}
        className={twMerge(disabled && 'opacity-50', isFullWidth && 'w-full')}
      >
        {/* <button {...rest}> */}
        <div className={buttonClasses}>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}

          {loading && <Spinner className="mr-2" />}

          <div className="flex flex-col items-center gap-2">
            {topCenterIcon && topCenterIcon}
            {!loading && children}
            {loading && <span>Loading...</span>}
          </div>

          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </div>
        {/* </button> */}
      </motion.button>
    );
  }
);

MyButton.displayName = 'MyButton';

export default MyButton;
