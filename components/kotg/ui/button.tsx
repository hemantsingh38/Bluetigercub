"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

const base =
  "inline-flex items-center justify-center gap-1 whitespace-nowrap font-kotg-sans text-[16px] font-semibold tracking-[0.3px] transition-opacity disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary: "h-10 rounded-[40px] bg-kotg-primary pl-4 pr-3 text-white hover:opacity-90",
  secondary:
    "h-10 rounded-[20px] border border-kotg-primary bg-white px-6 text-kotg-primary hover:bg-kotg-primary/5",
  ghost: "h-10 rounded-[100px] px-4 text-[14px] tracking-[0.6px] text-kotg-primary hover:bg-kotg-primary/5",
};

export function Button({
  variant = "primary",
  icon,
  iconPosition = "right",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type="button" className={clsx(base, variants[variant], className)} {...props}>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
