import React, { useCallback, useMemo } from "react";
import { useCurrentUserContext } from "@/context/currentuser-provider";
import { useQueryClient } from "@tanstack/react-query";
import { likePost } from "@/app/actions/like.action";
import { toast } from "./use-toast";

const useLike = (postId: number, likedIds: number[], userId?: number) => {
  const { data } = useCurrentUserContext();
  const currentUserId = data?.currentUser?.id;
  const queryClient = useQueryClient();

  const [loading, setLoading] = React.useState<boolean>(false);

  const hasLiked = useMemo(() => {
    const likes = likedIds || [];
    return likes.includes(currentUserId as number);
  }, [likedIds, currentUserId]);

  const toggleLike = useCallback(async () => {
    try {
      setLoading(true);
      const response = await likePost(postId);

      if (postId) {
        queryClient.invalidateQueries({
          queryKey: ["post", postId],
        });
      }
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: ["posts", "user", userId],
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["posts", "allposts"],
      });

      if (response.isLiked) {
        queryClient.invalidateQueries({
          queryKey: ["currentUser"],
        });
      }

      toast({
        title: "Sucess",
        description: `${
          response.isLiked ? "Liked" : "UnLike"
        } post successfully`,
        variant: "default",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to like post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [postId, queryClient, userId]);

  return {
    loading,
    hasLiked,
    toggleLike,
  };
};
export default useLike;
