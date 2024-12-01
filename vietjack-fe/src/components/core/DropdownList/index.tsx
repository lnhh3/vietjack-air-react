"use client";
import { ReactNode, useRef, useState } from "react";

import AppPopover, { AppPopoverRef } from "@/components/core/Popover";
import { cn } from "@/utils";

type Props<T> = {
  options: T[];
  format: (data: T) => { key: string; value: string };
  placeholder?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  placeholderClassName?: string;
  containerClassName?: string;
  buttonClassName?: string;
  onSelect?: (data: T | undefined) => void;
};

const DropdownList = <T,>({
  options,
  format,
  placeholder,
  startIcon,
  endIcon,
  placeholderClassName,
  containerClassName,
  buttonClassName,
  onSelect,
}: Props<T>) => {
  const popoverRef = useRef<AppPopoverRef>(null);
  const [value, setValue] = useState<T>();

  const handleSelectOption = (opt: T) => {
    const formatData = format(opt);
    const isSelected = value && format(value).key === formatData.key;
    isSelected ? setValue(undefined) : setValue(opt);
    onSelect?.(isSelected ? undefined : opt);
    popoverRef.current?.close();
  };

  return (
    <AppPopover
      onClickOutside={() => popoverRef.current?.close()}
      ref={popoverRef}
      placement="bottom"
      render={
        <div className="bg-white py-3 shadow-[rgba(149,157,165,0.2)_0px_8px_24px] min-w-[250px] rounded-[6px] px-3 max-h-[50vh] overflow-y-scroll">
          {options.map((opt) => {
            const formatData = format(opt);
            return (
              <div
                onClick={() => handleSelectOption(opt)}
                key={formatData.key}
                className={cn(
                  "cursor-pointer py-2 px-2 rounded-[4px] transition-all hover:bg-black/[0.05] mb-2",
                  value &&
                    format(value).key === formatData.key &&
                    "bg-neutral-100 ",
                )}
              >
                {formatData.value}
              </div>
            );
          })}
        </div>
      }
    >
      {({ visible }) => (
        <div
          className={cn("flex items-center gap-2", containerClassName)}
          onClick={() => popoverRef.current?.open()}
        >
          <div
            className={cn(
              "min-w-[200px] bg-white border border-neutral-100 rounded-[6px] flex items-center gap-2 px-3 h-[46px] cursor-pointer",
              "transition-all hover:border-neutral-300",
              visible && "!border-neutral-600",
              buttonClassName,
            )}
          >
            {startIcon}
            <div className={placeholderClassName}>
              {(value && format(value).value) || placeholder}
            </div>
            {endIcon}
          </div>
        </div>
      )}
    </AppPopover>
  );
};

export default DropdownList;
