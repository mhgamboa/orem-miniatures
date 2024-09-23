import React, { MouseEventHandler, ReactElement } from "react";
import { cn } from "@/lib/utils";
type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement | undefined>;
  icon: ReactElement;
  className?: string;
};

export default function IconButton({ onClick, icon, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 text-gray-600 hover:scale-110 transition",
        className
      )}
    >
      {icon}
    </button>
  );
}
