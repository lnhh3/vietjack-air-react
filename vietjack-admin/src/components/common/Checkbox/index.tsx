import { InputHTMLAttributes, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { CheckedBoxIcon } from '@/assets/svgs';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ checked, disabled = false, id, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);
  const baseClass =
    'bg-white border-2 rounded w-4 h-4 flex flex-shrink-0 justify-center items-center';

  const checkboxClasses = twMerge(
    baseClass,
    checked && 'bg-primary-600 border-primary-600',
    disabled && 'opacity-50 cursor-not-allowed'
  );

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div className="relative">
      <button
        disabled={disabled}
        className={checkboxClasses}
        onClick={handleOnChange}
        id={id ?? ''}
        type="button"
      >
        {checked && <CheckedBoxIcon />}
      </button>
    </div>
  );
};

export default Checkbox;
