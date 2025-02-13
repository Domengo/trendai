"use client";

import { ReactNode, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  text: string;
}

export default function Tooltip({ children, text }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute flex-1 z-10 bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-200 dark:bg-gray-500 dark:text-white text-xs rounded-md shadow-md">
          {text}
        </div>
      )}
    </div>
  );
}