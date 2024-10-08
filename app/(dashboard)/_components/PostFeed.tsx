"use client";
import { Spinner } from "@/components/spinner";
import usePost from "@/hooks/usePost";
import React from "react";
import PostItem from "./_common/PostItem";

interface PropsType {
  userId?: number;
  postId?: number;
}

const PostFeed: React.FC<PropsType> = ({ userId, postId }) => {
  const { data, isLoading } = usePost({ userId, postId });
  const posts = data?.posts ?? [];

  if (isLoading) {
    return (
      <div
        className="flex flex-col 
      h-[25vh] items-center w-full justify-center"
      >
        <Spinner size="icon" />
      </div>
    );
  }

  return (
    <div>
      {posts?.map((post: PostType) => (
        <PostItem key={post.id} userId={userId} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;
