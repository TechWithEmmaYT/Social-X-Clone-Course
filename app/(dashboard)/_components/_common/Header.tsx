"use client";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface PropsType {
  label?: string;
  showBackArrow?: boolean;
  showBorder?: boolean;
  children?: React.ReactNode;
}

const Header: React.FC<PropsType> = ({
  label,
  children,
  showBackArrow,
  showBorder = true,
}) => {
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div
      className={cn("p-5", {
        "border-b-[1px] dark:border-[rgb(47,51,54)]": showBorder,
      })}
    >
      <div className="flex flex-row items-center gap-5">
        {showBackArrow && (
          <ArrowLeft
            onClick={handleBack}
            color="currentColor"
            size={20}
            className="cursor-pointer
             hover:opacity-70 transition"
          />
        )}
        {label ? (
          <h1 className="text-xl font-semibold">{label}</h1>
        ) : (
          <>{children}</>
        )}
      </div>
    </div>
  );
};

export default Header;
