import { motion } from 'framer-motion';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { DropdownInput } from './DropdownInput';
import { DropdownOption } from './DropdownOption';
import { DropdownOptionSkeleton } from './DropdownOptionSkeleton';

export type TDropdownOption = {
  disabled?: boolean;
  icon?: ReactNode;
  title?: string | number;
  label: string | number;
  value: string | number;
};

export interface IDropdownProps {
  canSearch?: boolean;
  optionClassName?: string;
  containerClassName?: string;
  customButton?: ReactNode;
  defaultValue?: string | number;
  disabled?: boolean;
  dropdownClassName?: string;
  error?: string;
  onFetchingLoadMore?: () => void;
  onChange?: (value?: string | number) => void;
  onSearchViaApi?: (value?: string) => void;
  isFetchingNextPage?: boolean;
  isHiddenErrorMsg?: boolean;
  isLoading?: boolean;
  isValueAsOptionLabel?: boolean;
  label?: string;
  labelClasses?: string;
  leftIcon?: ReactNode;
  options: TDropdownOption[];
  listClassName?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  selectedValue?: string | number;
  showCheckedIcon?: boolean;
  showChevronIcons?: boolean;
  showClearIcon?: boolean;
  validInput?: ReactNode;
}

export const DropdownStandard = ({
  canSearch,
  optionClassName,
  containerClassName,
  customButton,
  defaultValue,
  disabled,
  dropdownClassName,
  error,
  onFetchingLoadMore = () => {},
  onChange = () => {},
  onSearchViaApi,
  isFetchingNextPage,
  isHiddenErrorMsg,
  isLoading,
  isValueAsOptionLabel,
  label,
  labelClasses,
  leftIcon,
  options,
  listClassName,
  placeholder,
  readonly,
  required,
  selectedValue, //manual selected value
  showCheckedIcon = true,
  showChevronIcons = true,
  showClearIcon,
  validInput,
}: IDropdownProps) => {
  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedValue ?? defaultValue);
  const [searchKey, setSearchKey] = useState<string | undefined>('');
  const [position, setPosition] = useState('bottom');

  const hasSelected = selectedOption != null && selectedOption != '';
  const placeholderText = placeholder ?? (canSearch ? t('search') : '');

  const handleListPosition = () => {
    const dropdownElement = ref.current;

    if (!dropdownElement) return;

    const { bottom } = dropdownElement.getBoundingClientRect();

    const height = getParentHeight(containerRef.current);

    const position = bottom > height ? 'top' : 'bottom';
    setPosition(position);
  };

  const getParentHeight = (element: Element | null) => {
    const windowHeight = window.innerHeight;

    if (!element) return windowHeight;

    //!!!selectors must be ordered by parent wrapper to child
    const parent = element.closest('#modal') ?? element.closest('#table');

    if (!parent) return windowHeight;

    if (parent) {
      return parent.getBoundingClientRect().height;
    } else {
      return windowHeight;
    }
  };

  const handleFindOption = (value?: string | number) => {
    return options.find((option) => option.value === value);
  };

  const handleTitleText = (option?: TDropdownOption): string => {
    if (!option) return '';

    return t(String(isValueAsOptionLabel ? option.value : option.label));
  };

  const handleOptionSelect = (option?: string | number) => {
    handleSearch();

    setSelectedOption(selectedValue ?? option);
    onChange(option);

    setIsOpen(false);
  };

  const handleShowList = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || readonly) return;

    if (!isOpen) {
      handleListPosition();
    }

    handleSearch();
    event.stopPropagation();
    event.preventDefault();

    if (canSearch && event.target === inputRef.current) {
      setIsOpen(true);
      return;
    }

    setIsOpen(!isOpen);
  };

  const handleSearch = (value?: string) => {
    onSearchViaApi ? onSearchViaApi(value) : setSearchKey(value);
  };

  const handleSearchOptionsList = () => {
    return searchKey
      ? [...options].filter(
          (option) =>
            String(option.value).toLowerCase().trim().includes(searchKey.toLowerCase()) ||
            String(option.title)?.toLowerCase().trim().includes(searchKey.toLowerCase()) ||
            String(option.label)?.toLowerCase().trim().includes(searchKey.toLowerCase())
        )
      : [...options];
  };

  useEffect(() => {
    setSelectedOption(selectedValue ?? defaultValue);
  }, [defaultValue, selectedValue]);

  useEffect(() => {
    if (isOpen) {
      if (canSearch && inputRef.current) {
        inputRef.current.focus();
      }

      clearTimeout(timeoutRef.current);
      setTimeout(() => {
        const selectedOptionIndex = options.findIndex((option) => option.value === selectedOption);

        const selectedItem = listRef.current?.querySelector(
          `li[role="option"]:nth-child(${selectedOptionIndex + 1})`
        );

        if (selectedItem) {
          selectedItem.scrollIntoView({
            block: 'nearest',
          });
        }
      }, 0);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isOpen]);

  let isFetching = false;
  const handleScroll = async () => {
    const dropdownElement = listRef.current;
    if (!dropdownElement) {
      return;
    }
    const { scrollTop, clientHeight, scrollHeight } = dropdownElement;

    if (!isFetching && scrollTop + clientHeight >= scrollHeight - 50) {
      isFetching = true;

      if (!isFetchingNextPage) {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await onFetchingLoadMore();
      }

      isFetching = false;
    }
  };

  useEffect(() => {
    if (isOpen && !!onFetchingLoadMore) {
      clearTimeout(timeoutRef.current);

      setTimeout(() => {
        const dropdownElement = listRef.current;

        if (dropdownElement) {
          dropdownElement.addEventListener('scroll', handleScroll);
          return () => {
            dropdownElement.removeEventListener('scroll', handleScroll);
          };
        }
      }, 0);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDownOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleMouseDownOutside);
    return () => {
      window.removeEventListener('mousedown', handleMouseDownOutside);
    };
  }, [ref, setIsOpen, isOpen]);

  return (
    <div className={containerClassName} ref={containerRef}>
      {label && (
        <p className={twMerge('mb-1.5 !text-sm-medium text-gray-700', labelClasses)}>
          {t(label)}
          {required && <span className="text-error-500">&nbsp;*</span>}
        </p>
      )}

      <div ref={ref} className="relative">
        <div
          role="presentation"
          onClick={handleShowList}
          title={hasSelected ? handleTitleText(handleFindOption(selectedOption)) : undefined}
        >
          {customButton ?? (
            <DropdownInput
              onOptionSelect={handleOptionSelect}
              onSearch={handleSearch}
              hasSelected={hasSelected}
              inputRef={inputRef}
              isOpen={isOpen}
              canSearch={canSearch}
              disabled={disabled}
              dropdownClassName={dropdownClassName}
              leftIcon={leftIcon}
              placeholderText={placeholderText}
              readonly={readonly}
              showChevronIcons={showChevronIcons}
              showClearIcon={showClearIcon}
              title={
                hasSelected ? handleTitleText(handleFindOption(selectedOption)) : placeholderText
              }
              error={error}
            />
          )}

          {validInput && <div className="pointer-events-none">{validInput}</div>}
        </div>

        <motion.div
          className={twMerge(
            'absolute left-0 right-0 z-50 w-full origin-top rounded-lg border bg-white text-left shadow-lg',
            isOpen && 'my-1',
            position === 'top' && 'bottom-[100%] origin-bottom',
            listClassName
          )}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            scaleY: isOpen ? 1 : 0,
          }}
        >
          <ul
            ref={listRef}
            tabIndex={-1}
            className="overflow-auto rounded-md max-h-80 text-md-medium focus:outline-none"
          >
            {isLoading ? (
              Array(7)
                .fill(null)
                .map((_, idx) => <DropdownOptionSkeleton key={idx} />)
            ) : handleSearchOptionsList().length ? (
              handleSearchOptionsList().map((option, index) => {
                return (
                  <DropdownOption
                    key={index}
                    disabled={option.disabled}
                    handleOptionSelect={handleOptionSelect}
                    icon={option.icon}
                    isSelected={selectedOption === option.value}
                    optionClassName={optionClassName}
                    optionLabel={handleTitleText(option)}
                    showCheckedIcon={showCheckedIcon}
                    value={option.value}
                  />
                );
              })
            ) : (
              <div className="flex items-center justify-center mx-auto my-3 h-11">
                <p className="text-gray-900 text-sm-medium">{t('noDataFound')}</p>
              </div>
            )}

            {isFetchingNextPage && <DropdownOptionSkeleton />}
          </ul>
        </motion.div>
      </div>

      {error && !isHiddenErrorMsg && <p className="mt-2 text-sm-regular text-error-500">{error}</p>}
    </div>
  );
};
