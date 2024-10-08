"use client";
import React, { useMemo } from "react";
import { format } from "date-fns";
import { useCurrentUserContext } from "@/context/currentuser-provider";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import FollowButton from "./_common/FollowButton";
import { PLAN_TYPE } from "@/constants/pricing-plans";
import Badge from "@/components/badge";

interface PropsType {
  user: UserType;
}
const UserBio: React.FC<PropsType> = ({ user }) => {
  const { data } = useCurrentUserContext();
  const currentUser: UserType = data?.currentUser ?? ({} as UserType);

  const { onOpenEditModal } = useStore();

  const createdAt = useMemo(() => {
    if (!user?.createdAt) return null;

    return format(new Date(user?.createdAt), "MMM yyy");
  }, [user?.createdAt]);

  return (
    <div
      className="border-b-[1px]
        pb-4
    "
    >
      <div
        className="flex justify-end p-2 pt-3
      px-4"
      >
        {currentUser?.id == user?.id ? (
          <Button
            variant="outline"
            className="!border-[rgb(83,100,113)]"
            onClick={onOpenEditModal}
          >
            Edit Profile
          </Button>
        ) : (
          <FollowButton userId={user?.id} username={user?.username as string} />
        )}
      </div>
      <div className="mt-7 px-4">
        <div className="flex flex-col">
          <div
            className="flex item-center
           flex-row gap-1"
          >
            <h5 className="text-2xl font-black">{user?.name}</h5>
            {user?.subscription?.plan === PLAN_TYPE.PRO && <Badge />}
          </div>
          <p
            className="!text-[#959fa8] 
          text-base block truncate font-normal"
          >
            @{user.username}
          </p>
        </div>

        <div
          className="
 flex flex-row items-center gap-1 
 text-[rgb(113,118,123)] text-[15px] mt-4
 "
        >
          <CalendarCheck size={17} />
          <p>Joined {createdAt}</p>
        </div>

        <div className="flex items-center mt-3 gap-6">
          <div className="flex items-center gap-1">
            <p>{user?.followingIds?.length}</p>
            <p className="text-[rgb(113,118,123)]">Following</p>
          </div>
          <div className="flex items-center gap-1">
            <p>{user?.followersCount}</p>
            <p className="text-[rgb(113,118,123)]">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
