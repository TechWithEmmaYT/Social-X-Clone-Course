"use client";
import Logo from "@/components/logo";
import { Spinner } from "@/components/spinner";
import useNotifications from "@/hooks/useNotification";
import React from "react";

const NotificationFeed = () => {
  const { data, isLoading } = useNotifications();
  const notifications = data?.data ?? [];

  if (isLoading) {
    return (
      <div
        className="flex flex-col h-[25vh] 
      items-center w-full justify-center"
      >
        <Spinner size="icon" />
      </div>
    );
  }

  if (notifications?.length === 0) {
    return (
      <div className=" w-full   p-6">
        <h5
          className="text-2xl text-center
         font-bold dark:text-white/80"
        >
          No notifications
        </h5>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      {notifications?.map((notification: any) => (
        <div
          key={notification.id}
          className="flex flex-row w-full 
          items-center
          p-6 gap-4 border-b-[1px]
          "
        >
          <Logo className="!size-5" />
          <p className="dark:text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationFeed;
