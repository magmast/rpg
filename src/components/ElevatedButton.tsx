import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ElevatedButtonProps = ComponentPropsWithoutRef<"button">;

const ElevatedButton = ({ className, ...props }: ElevatedButtonProps) => (
  <button
    {...props}
    className={twMerge(
      "bg-primary-600 disabled:bg-primary-400 disabled:cursor-not-allowed text-white w-24 rounded p-1 shadow",
      className,
    )}
  />
);

export default ElevatedButton;
