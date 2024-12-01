"use client";
import { FieldInputProps } from "formik";

import { cn } from "@/utils";

type Props = {
  value?: string;
  placeholder?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onChange?: (value: string) => void;
  inputClassName?: string;
  className?: string;
  type?: "password" | "text";
  fieldInputProps?: FieldInputProps<any>;
};

const Input = ({
  value,
  placeholder,
  startIcon,
  endIcon,
  onChange,
  className,
  type = "text",
  inputClassName,
  fieldInputProps,
}: Props) => {
  return (
    <div
      className={cn(
        "inline-flex items-center transition border border-neutral-200 rounded-[6px] py-2 px-2 hover:border-neutral-400",
        "focus-within:!border-neutral-500 gap-2",
        className,
      )}
    >
      {startIcon}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={cn(
          "outline-none border-none bg-transparent w-full h-full text-[14px]",
          inputClassName,
        )}
        {...fieldInputProps}
        onChange={(e) => {
          onChange?.(e.target.value);
          fieldInputProps?.onChange?.(e);
        }}
      />
      {endIcon}
    </div>
  );
};

export default Input;
