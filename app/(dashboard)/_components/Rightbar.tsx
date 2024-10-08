"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SubscribeAds from "./_common/SubscribeAds";
import FollowList from "./FollowList";
import SearchForm from "./SearchForm";

const Rightbar = (props: { isPro: boolean }) => {
  const pathname = usePathname();
  return (
    <div
      className="px-0 fixed top-0
    py-4 flex max-w-[330px]
    "
    >
      <div className=" w-full flex flex-col gap-3 max-w-[330px]">
        {/* Search Form */}
        {pathname !== "/search" && <SearchForm />}
        {!props.isPro && <SubscribeAds />}
        <FollowList />
      </div>
    </div>
  );
};

export default Rightbar;
