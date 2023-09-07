import type { Component, JSX } from "solid-js";

export const Button: Component<
  { className?: string } & JSX.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...rest }) => {
  return (
    <button
      class={`bg-line-background text-line-foreground border border-line-foreground rounded-md px-1 py-0.5 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
