"use client";
import { BASE_URL } from "@/lib/base-url";
import fetcher from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["users", "allusers"],
    queryFn: () => fetcher(`${BASE_URL}/api/users`),
    staleTime: Infinity,
  });
  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export default useUsers;
