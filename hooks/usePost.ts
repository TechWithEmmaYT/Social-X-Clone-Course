import { BASE_URL } from "@/lib/base-url";
import fetcher from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

interface PropsType {
  userId?: number;
  postId?: number;
}

const usePost = ({ userId, postId }: PropsType) => {
  const url = userId
    ? `${BASE_URL}/api/posts?userId=${userId}`
    : postId
    ? `${BASE_URL}/api/posts/${postId}`
    : `${BASE_URL}/api/posts`;

  const queryKey = postId
    ? ["post", postId]
    : userId
    ? ["posts", "user", userId]
    : ["posts", "allposts"];

  const { error, data, isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn: () => fetcher(url),
    enabled: !!url,
    //staleTime: 0,
  });

  return {
    data,
    error,
    isLoading,
    isError,
    refetch,
  };
};

export default usePost;
