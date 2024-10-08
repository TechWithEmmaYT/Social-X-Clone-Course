"use client";
import { BASE_URL } from "@/lib/base-url";
import fetcher from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useNotifications = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetcher(`${BASE_URL}/api/notifications`),
  });
  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export default useNotifications;
