"use client";
import React, { useCallback } from "react";
import { Dot, Ellipsis, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/logo";
import { useStore } from "@/hooks/useStore";

interface PropsType {
  label?: string;
  href?: string;
  icon?: LucideIcon;
  isUser?: boolean;
  alert?: boolean;
  userInfo?: {
    profileImgUrl: string;
    username: string;
    name: string;
  };
  onClick?: () => void;
}

const SidebarItem: React.FC<PropsType> = ({
  userInfo = null,
  isUser = false,
  label,
  icon: Icon,
  onClick,
  href,
  alert,
}) => {
  const router = useRouter();

  const { onOpenProModal } = useStore();

  const handleClick = useCallback(() => {
    if (onClick) onClick();

    if (href) {
      router.push(href);
    }
  }, [router, onClick, href]);

  const handleOpenModal = useCallback(() => {
    if (href !== "#premium") return;
    onOpenProModal();
  }, [href, onOpenProModal]);
  return (
    <div
      role="button"
      onClick={handleClick}
      className="flex w-full flex-row items-center"
    >
      <div
        className="relative rounded-full h-14 
      w-14 flez items-center justify-center
      p-3 
      hover:bg-slate-300
      hover:bg-opacity-10
      cursor-pointer
      lg:hidden
      
      "
      >
        {isUser && userInfo ? (
          <Avatar>
            <AvatarImage
              src={userInfo?.profileImgUrl}
              className="object-cover"
            />
            <AvatarFallback className="font-bold text-[18px]">
              {userInfo?.name?.[0]}
            </AvatarFallback>
          </Avatar>
        ) : (
          <>
            {href === "#premium" && (
              <div role="button">
                <Logo width="28px" height="28px" />
              </div>
            )}

            {Icon && (
              <Icon
                size={28}
                className="text-[#14171A]
                dark:text-white
                  "
              />
            )}

            {alert && (
              <Dot
                size={70}
                className="
                text-primary absolute -top-4
                left-0
                  "
              />
            )}
          </>
        )}
      </div>

      <div
        className="relative
      hidden
      lg:flex
        gap-4
        p-3
        py-3
        w-full
        rounded-full
        hover:bg-slate-300
        hover:bg-opacity-10
        cursor-pointer
        items-center
"
        onClick={handleOpenModal}
      >
        {isUser && userInfo ? (
          <div className="flex flex-row w-full gap-3">
            <Avatar>
              <AvatarImage
                src={userInfo?.profileImgUrl}
                className="object-cover"
              />
              <AvatarFallback className="font-bold text-[18px]">
                {userInfo?.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div
              className="flex flex-row w-full 
             justify-between gap-2"
            >
              <div className="flex-1 text-left">
                <h3
                  className="text-[16px] text-[#14171A]
                 dark:text-white block max-w-[150px]
                 truncate font-bold leading-tight"
                >
                  {userInfo?.name}
                </h3>
                <p
                  className="!text-[#959fa8] 
                text-[15px] block max-w-[120px] truncate
                font-medium"
                >
                  @{userInfo?.username}
                </p>
              </div>
              <div className="shrink-0 flex justify-end">
                <Ellipsis />
              </div>
            </div>
          </div>
        ) : (
          <>
            {href === "#premium" && <Logo width="24px" height="24px" />}

            {Icon && (
              <Icon
                size={24}
                className="text-[#14171A]
                dark:text-white
                  "
              />
            )}
            <span
              className="
            hidden lg:block 
            text-[#14171A]
               dark:text-white
                text-xl
            "
            >
              {label}
            </span>

            {alert && (
              <Dot
                size={70}
                className="
                text-primary absolute -top-5
                -left-1
                  "
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
``;

export default SidebarItem;
