import { motion } from 'framer-motion';
import { ChevronsUpIcon, X } from 'lucide-react';
import { ChangeEvent, ReactNode, RefObject } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDebouncedCallback } from 'use-debounce';

import { ESHColors } from '@/constants';

type Props = {
  canSearch?: boolean;
  disabled?: boolean;
  dropdownClassName?: string;
  onOptionSelect: (option?: string | number) => void;
  onSearch: (value: string) => void;
  hasSelected: boolean;
  inputRef: RefObject<HTMLInputElement>;
  isOpen: boolean;
  leftIcon?: ReactNode;
  placeholderText?: string;
  readonly?: boolean;
  showChevronIcons?: boolean;
  showClearIcon?: boolean;
  title: string;
  error?: string;
};

export const DropdownInput = ({
  canSearch,
  disabled,
  dropdownClassName,
  onOptionSelect,
  onSearch,
  hasSelected,
  inputRef,
  isOpen,
  leftIcon,
  placeholderText,
  readonly,
  showChevronIcons,
  showClearIcon,
  title,
  error,
}: Props) => {
  const debounced = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  }, 500);

  const buttonClassName = twMerge(
    'flex items-center gap-2 w-full select-none truncate rounded-lg border cursor-pointer border-gray-300 bg-white px-3 py-2 text-left text-md-medium text-gray-900',
    !!error && 'border-error-500'
  );

  return (
    <div
      className={twMerge(
        buttonClassName,
        disabled && 'cursor-not-allowed',
        readonly && 'cursor-default',
        dropdownClassName
      )}
    >
      {leftIcon && (
        <div
          className={twMerge(
            'cursor-pointer',
            readonly && '!cursor-default',
            disabled && 'cursor-not-allowed'
          )}
        >
          {leftIcon}
        </div>
      )}

      {canSearch && isOpen ? (
        <input
          ref={inputRef}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder={placeholderText}
          className={twMerge('w-[inherit] truncate text-md-medium focus:outline-none')}
          onChange={debounced}
        />
      ) : (
        <p className={twMerge('w-full truncate !text-md-medium', !hasSelected && 'text-gray-400')}>
          {title}
        </p>
      )}

      <>
        {!(disabled || readonly) &&
          !(hasSelected && (showClearIcon || canSearch)) &&
          showChevronIcons && (
            <motion.div
              className="cursor-pointer"
              animate={{
                rotateX: isOpen ? 180 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ChevronsUpIcon size={20} color={ESHColors.gray_700} />
            </motion.div>
          )}

        {!(disabled || readonly) && hasSelected && (canSearch || showClearIcon) && (
          <div
            role="presentation"
            className="cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              onOptionSelect();
            }}
          >
            <X size={20} color={ESHColors.gray_700} />
          </div>
        )}
      </>
    </div>
  );
};
