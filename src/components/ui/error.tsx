import * as React from "react";
import "@/styles/error.css";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      error: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function Error(
  {
    message,
    className,
    ...props
  }: {
    message: string
    className?: string
  }
) {
  return (
    <error>
      <p>
        ERROR
      </p>
    </error>
  )
}