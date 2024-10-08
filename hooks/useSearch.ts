import { BASE_URL } from "@/lib/base-url";
import fetcher from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

interface PropsType {
  query: string;
  filter?: string;
}
const useSearch = ({ query, filter }: PropsType) => {
  const url = query ? `${BASE_URL}/api/search?q=${query}&f=${filter}` : null;

  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetcher(url!),
    enabled: !!url,
  });

  const loading = isLoading || isFetching;

  return {
    data,
    error,
    isLoading: loading,
    refetch,
  };
};

export default useSearch;
