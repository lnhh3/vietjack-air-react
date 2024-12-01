import React, { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  validInput?: React.ReactNode;
  inputClassName?: string;
  labelClassName?: string;
  register?: UseFormRegisterReturn;
  isHiddenLabel?: boolean;
  isHiddenErrorMsg?: boolean;
}

interface Props extends InputHTMLAttributes<HTMLInputElement>, InputProps {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    label,
    placeholder,
    error,
    hint,
    required,
    disabled,
    leftSection,
    rightSection,
    validInput,
    inputClassName,
    labelClassName,
    className,
    register,
    isHiddenLabel = false,
    isHiddenErrorMsg = false,
    ...rest
  } = props;
  const inputClasses = twMerge(
    'w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-md-regular text-gray-500 placeholder-gray-500 focus:border-primary-300 focus:outline-4 focus:outline focus:outline-primary-50 read-only:!outline-none read-only:cursor-default read-only:!border-gray-300 focus:cursor-text disabled:opacity-50',
    !!error && 'border border-error-500 focus:border-error-500 focus:outline-error-200',
    disabled &&
      'bg-gray-50 !cursor-not-allowed placeholder:text-gray-500 disabled:focus:border-gray-300',
    !!leftSection && 'pl-10',
    !!rightSection && 'pr-10',
    inputClassName
  );

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    const { target } = e;

    if (target instanceof HTMLInputElement && target.type === 'number') {
      target.blur();

      // eslint-disable-next-line prefer-const
      let timeoutId;
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        target.focus();
      }, 200);
    }
  };

  return (
    <div className={twMerge('relative flex flex-col', className)}>
      {label && (
        <div
          className={twMerge(
            'mb-1.5 !text-sm-medium',
            !isHiddenLabel ? ' text-gray-700 ' : 'text-white',
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-error-500">&nbsp;*</span>}
        </div>
      )}

      <div className="relative">
        <div
          className={twMerge(
            'absolute left-0 top-1/2 -translate-y-1/2 transform pl-3 text-gray-500'
          )}
        >
          {leftSection}
        </div>

        <div className="absolute right-0 pr-3 transform -translate-y-1/2 top-1/2">
          {rightSection}
        </div>

        <div className="absolute right-[-62px] top-1/2 -translate-y-1/2 transform pr-3">
          {validInput}
        </div>

        <input
          className={inputClasses}
          disabled={disabled}
          placeholder={placeholder}
          ref={ref}
          {...register}
          {...rest}
          onWheel={handleWheel}
        />
      </div>

      {!!hint && <p className="mt-1.5 text-sm-regular text-gray-600">{hint}</p>}

      {!!error && !isHiddenErrorMsg && (
        <p className="mt-1.5 text-sm-regular text-error-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
