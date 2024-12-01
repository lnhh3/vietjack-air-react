import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useOnClickOutside } from 'hooks-react-custom';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { useDebouncedCallback } from 'use-debounce';

import MyCheckbox from '@/components/common/Checkbox';

import styles from './index.module.scss';

export type Option = {
  label: string;
  value: string;
};

interface IDropdownProps {
  options: Option[];
  selectedOptions: string[];
  label?: string;
  selectAllLabel?: string;
  placeholder?: string;
  error?: string;
  dropdownClassName?: string;
  labelClasses?: string;
  disabled?: boolean;
  required?: boolean;
  leftIcon?: ReactNode;
  canSearch?: boolean;
  suggestionDes?: ReactNode;
  renderCustomSuggestionItem?: (option: string) => ReactNode;
  handleOnChange: (options: string[]) => void;
  handleSearchValue?: (value: string) => void;
  isOpen?: boolean;
  showDropdownField?: boolean;
  placeholderClassName?: string;
  optionsContainerClassName?: string;
  hasCountPlaceholder?: boolean;
  optionClassName?: string;
  handleOnClose?: () => void; //Must has this when use search
}

const MultiSelectDropdown = ({
  options,
  selectedOptions = [],
  label,
  selectAllLabel,
  placeholder = '',
  error,
  required,
  canSearch,
  dropdownClassName,
  optionsContainerClassName,
  labelClasses,
  leftIcon,
  suggestionDes,
  hasCountPlaceholder = false,
  handleOnChange,
  handleSearchValue = () => {},
  isOpen: initialIsOpen = false,
  showDropdownField = true,
  renderCustomSuggestionItem,
  placeholderClassName,
  optionClassName,
  handleOnClose = () => {},
}: IDropdownProps) => {
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [placeholderShow, setPlaceholderShow] = useState<string>('');
  const isSelectedAll = options.length
    ? options.every((option) => selectedOptions.includes(option.value))
    : false;
  const dropdownClasses = twMerge(styles.base, dropdownClassName);

  const handleClick = (option: Option) => {
    const optionIndex = selectedOptions.findIndex(
      (selectedOption) => selectedOption === option.value
    );

    if (optionIndex > -1) {
      const newSelectedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption != option.value
      );
      handleOnChange(newSelectedOptions);
    } else {
      handleOnChange([...selectedOptions, option.value]);
    }
  };

  const debounced = useDebouncedCallback((value) => {
    handleSearchValue(value);
  }, 500);

  const renderInput = () => {
    if (canSearch && isOpen) {
      return (
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder={t('search') as string}
          className={twMerge(
            'w-full text-md-medium !text-gray-900 focus:outline-none',
            placeholderShow && selectedOptions.length > 0 && 'bg-primary-100 text-primary-700'
          )}
          ref={inputRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => debounced(e.target.value)}
        />
      );
    }
  };

  useEffect(() => {
    setPlaceholderShow(() => {
      if (selectedOptions.length === 0) {
        return placeholder || '';
      }
      if (selectedOptions.length === 1) {
        return options.find((option) => option.value === selectedOptions[0])?.label as string;
      }
      if (isSelectedAll) {
        return 'All';
      }
      return `${selectedOptions.length} ${placeholder}`;
    });
  }, [selectedOptions]);

  useOnClickOutside(ref, () => {
    setIsOpen(false);
    handleOnClose();
  });

  return (
    <div className={twMerge('relative min-w-fit cursor-pointer')} ref={ref}>
      {label && (
        <div className={twMerge('mb-1.5 text-sm-medium text-gray-700', labelClasses)}>
          {label}
          {required && <span className="ml-2 text-error-500">*</span>}
        </div>
      )}

      <div className={twMerge('relative min-w-fit')}>
        {showDropdownField && (
          <div
            className={twMerge(
              dropdownClasses,
              selectedOptions.length > 0 && 'cursor-pointer rounded-lg !bg-primary-100'
            )}
            role="presentation"
            onClick={() => setIsOpen(!isOpen)}
            id="dropdown"
          >
            <div className="w-5 h-5">{leftIcon && leftIcon}</div>

            {isOpen && canSearch ? (
              renderInput()
            ) : (
              <span
                className={twMerge(
                  styles.placeholder,
                  placeholderClassName,
                  selectedOptions.length > 0 && '!text-sm-semi-bold !text-primary-700'
                )}
              >
                {hasCountPlaceholder && placeholderShow}
              </span>
            )}

            <div
              role="presentation"
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2.5"
              onClick={(e) => {
                selectedOptions.length > 0 && e.stopPropagation();
                handleOnChange([]);
              }}
            >
              {!isOpen && selectedOptions.length === 0 ? (
                <ChevronDown />
              ) : selectedOptions.length > 0 && !isOpen ? (
                <X color="#004EEB" />
              ) : (
                <ChevronUp />
              )}
            </div>
          </div>
        )}
        <motion.div
          className="absolute left-0 right-0 z-50 origin-top"
          animate={{ opacity: isOpen ? 1 : 0, scaleY: isOpen ? 1 : 0.5 }}
        >
          <Transition
            show={isOpen}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            // @ts-ignore
            className={twMerge(
              'absolute z-50 mt-1 w-full min-w-full rounded-lg border border-gray-200 bg-white shadow-lg',
              optionsContainerClassName
            )}
          >
            <div>
              {suggestionDes && <>{suggestionDes}</>}

              <ul
                tabIndex={-1}
                className={twMerge(
                  'scrollbar max-h-80 max-w-[inherit] overflow-auto rounded-md py-1 text-md-medium focus:outline-none',
                  optionClassName
                )}
                style={{ maxHeight: '320px' }}
              >
                {selectAllLabel && !!options.length && (
                  <li
                    className={`${
                      isSelectedAll ? 'bg-gray-50 hover:bg-gray-200' : 'hover:bg-gray-100'
                    } relative cursor-pointer px-3.5 py-2.5`}
                    onClick={() => {
                      handleOnChange(!isSelectedAll ? options.map((option) => option.value) : []);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleOnChange(!isSelectedAll ? options.map((option) => option.value) : []);
                      }
                    }}
                    role="option"
                    aria-selected={isSelectedAll}
                    tabIndex={0 as const}
                    title={selectAllLabel}
                  >
                    <div className="flex items-center">
                      <div className="flex items-center w-full gap-2">
                        <MyCheckbox checked={isSelectedAll} onChange={() => {}} />
                        <p className="text-gray-700 truncate text-sm-medium">{selectAllLabel}</p>
                      </div>
                    </div>
                  </li>
                )}

                {options.map((option, index) => {
                  const isSelected = selectedOptions.findIndex((item) => item == option.value) > -1;
                  return (
                    <li
                      key={index}
                      className={`${
                        isSelected ? 'bg-gray-50 hover:bg-gray-200' : 'hover:bg-gray-100'
                      } relative cursor-pointer px-3.5 py-2.5`}
                      onClick={() => {
                        handleClick(option);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          handleClick(option);
                        }
                      }}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={0 as const}
                      title={option.label}
                    >
                      <div className="flex items-center">
                        {renderCustomSuggestionItem ? (
                          renderCustomSuggestionItem(option.label)
                        ) : (
                          <div className="flex items-center w-full gap-2">
                            <MyCheckbox checked={isSelected} onChange={() => {}} />
                            <p className="text-gray-700 truncate text-sm-medium">{option.label}</p>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Transition>
        </motion.div>
      </div>
      {error && <p className="mt-2 text-sm text-error-500">{error}</p>}
    </div>
  );
};

MultiSelectDropdown.displayName = 'Dropdown';
export default MultiSelectDropdown;
