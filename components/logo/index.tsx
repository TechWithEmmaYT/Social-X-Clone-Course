"use client";
import { cn } from "@/lib/utils";
import React from "react";

const Logo = (props: {
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
}) => {
  const { width, height, className, onClick } = props;
  const handleClick = () => {
    onClick?.();
  };
  return (
    <div
      role="button"
      onClick={handleClick}
      style={{ width: width || "auto", height: height || "auto" }}
      className={cn(
        `flex items-center justify-center
              hover:bg-opacity-10 transition
              `,
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-label="X"
        role="img"
        className={`w-full h-full fill-current`}
      >
        <g>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
