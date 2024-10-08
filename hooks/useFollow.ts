"use client";

import { useCallback, useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUserContext } from "@/context/currentuser-provider";
import { followUser } from "@/app/actions/follow.action";
import { toast } from "./use-toast";

const useFollow = (userId: number, username: string) => {
  const { data } = useCurrentUserContext();
  const currentUser = data?.currentUser || ({} as UserType);

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const isFollowing = useMemo(() => {
    const following = currentUser.followingIds || [];
    return following.includes(userId);
  }, [currentUser.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    try {
      setLoading(true);
      const response = await followUser(userId);

      if (username) {
        queryClient.invalidateQueries({
          queryKey: ["user", username],
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });

      toast({
        title: "Success",
        description: response.isFollowing
          ? "Followed user successfully"
          : "Unfollowed user successfully",
        variant: "default",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to follow",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [userId, username, queryClient]);

  return {
    loading,
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
