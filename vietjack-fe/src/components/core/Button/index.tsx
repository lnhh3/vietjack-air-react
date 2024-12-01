import { BounceLoader } from "react-spinners";

import { cn } from "@/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  variant?: "outline" | "fill";
};

const Button = ({
  loading,
  type,
  children,
  className,
  disabled,
  onClick,
  variant = "fill",
}: Props) => {
  return (
    <button
      type={type}
      tabIndex={-1}
      className={cn(
        "border border-transparent h-[40px] hover:bg-black bg-black/85 active:bg-black/80 transition text-white px-4 rounded cursor-pointer outline-none",
        variant === "outline" &&
          "border-black bg-transparent text-black hover:text-white",
        (disabled || loading) && "!bg-black/75",
        className,
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {!loading && children}
      {loading && (
        <div className="flex items-center justify-center">
          <BounceLoader loading={loading} size={20} color={"white"} />
        </div>
      )}
    </button>
  );
};

export default Button;
