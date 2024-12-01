import { PropsWithChildren } from "react";

import { cn } from "@/utils";

type Props = PropsWithChildren<{
  className?: string;
}>;

const ContainerBackground = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "relative bg-[url('/img/bg-web.webp')] object-cover bg-no-repeat bg-cover",
        className,
      )}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-white/50"></div>
      {children}
    </div>
  );
};

export default ContainerBackground;
