"use client";

import { createContext, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/lib/base-url";
import fetcher from "@/lib/fetcher";
import { useStore } from "@/hooks/useStore";

type CurrentUserType = {
  currentUser: UserType;
};

// Define the context shape
type CurrentUserContextType = {
  data?: CurrentUserType;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
};

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

export const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, error, isLoading, isFetching, refetch } =
    useQuery<CurrentUserType>({
      queryKey: ["currentUser"],
      queryFn: () => fetcher(`${BASE_URL}/api/current-user`),
      staleTime: 0,
      refetchInterval: 20000,
    });

  const { onOpenBirthDayModal } = useStore();

  useEffect(() => {
    if (data?.currentUser && !data?.currentUser?.dateOfBirth) {
      onOpenBirthDayModal();
    }
  }, [data, onOpenBirthDayModal]);

  return (
    <CurrentUserContext.Provider
      value={{ data, error, isLoading, isFetching, refetch }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContext = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      "useCurrentUserContext must be used within a CurrentUserProvider"
    );
  }
  return context;
};
