import { Check } from 'lucide-react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { ESHColors } from '@/constants';

type Props = {
  disabled?: boolean;
  handleOptionSelect: (value?: string | number) => void;
  icon?: ReactNode;
  isSelected?: boolean;
  optionClassName?: string;
  optionLabel: string;
  showCheckedIcon?: boolean;
  value: string | number;
};

export const DropdownOption = ({
  disabled,
  handleOptionSelect,
  icon,
  isSelected,
  optionClassName,
  optionLabel,
  showCheckedIcon,
  value,
}: Props) => {
  const hasDeleteText = String(value).toLowerCase().includes('delete');
  const { t } = useTranslation();

  return (
    <li
      className={twMerge(
        'relative cursor-pointer px-3.5 py-2.5 hover:bg-gray-100',
        isSelected && 'bg-gray-50 hover:bg-gray-200',
        disabled && 'pointer-events-none opacity-30',
        optionClassName
      )}
      onClick={(event) => {
        event.stopPropagation();
        handleOptionSelect(value);
      }}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.key === 'Enter') {
          handleOptionSelect(value);
        }
      }}
      role="option"
      aria-selected={isSelected}
      tabIndex={0 as const}
      title={optionLabel}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 truncate">
          {icon && <div className="max-h-5 max-w-5">{icon}</div>}

          <span className={twMerge('block truncate', hasDeleteText && 'text-error-600')}>
            {t(optionLabel)}
          </span>
        </div>

        {showCheckedIcon && isSelected && (
          <div className="max-h-5 max-w-5">
            <Check width="20" height="20" color={ESHColors.blue_700} />
          </div>
        )}
      </div>
    </li>
  );
};
