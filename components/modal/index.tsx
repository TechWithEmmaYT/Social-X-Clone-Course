"use client";
import React, { Fragment, useCallback } from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogContent } from "../ui/dialog";
import Logo from "../logo";
import { cn } from "@/lib/utils";

interface PropsType {
  isOpen: boolean;
  title: string;
  subTitle?: string;
  showLogo?: boolean;
  isCentered?: boolean;
  body?: React.ReactElement;
  disabled?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<PropsType> = ({
  children,
  title,
  isCentered = false,
  subTitle,
  showLogo = true,
  isOpen,
  onClose,
  body,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose?.();
  }, [disabled, onClose]);
  return (
    <Fragment>
      <div>{children}</div>

      <Dialog modal open={isOpen} onOpenChange={handleClose}>
        <DialogContent
          className="min-h-[350px] max-h-[600px] !max-w-[600px]
                pt-5 pb-10 !rounded-2xl overflow-y-auto
              "
        >
          <DialogHeader
            className="dialog_top_header
                   !p-0 w-full
                  "
          >
            {showLogo && (
              <div className="w-full h-[40px] flex items-center justify-center">
                <Logo width="40px" height="40px" />
              </div>
            )}
            <div className="pt-2 pb-0 px-5">
              <DialogTitle
                className={cn("leading-9 !p-0 font-bold text-[31px]", {
                  "text-center": isCentered,
                })}
              >
                {title}
              </DialogTitle>
              {subTitle && (
                <DialogDescription
                  className={cn(
                    "text-[14px] !mt-0 !p-0 text-muted-foreground",
                    {
                      "text-center w-full block max-w-sm mx-auto": isCentered,
                    }
                  )}
                >
                  {subTitle}
                </DialogDescription>
              )}
            </div>
          </DialogHeader>
          <div className="flex w-full flex-col items-center justify-start">
            {body}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Modal;
