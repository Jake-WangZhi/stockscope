import { fetcher } from "@/libs/utils";
import { StockDisplayInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";

type Args = {
  email: string;
  start_date: string;
  end_date: string;
};

export const useFavoriteDisplayInfo = ({ email, start_date, end_date }: Args) => {
  const {
    isError:favoriteIsError,
    data: favoriteDisplayInfo,
    isLoading:favoriteIsLoading,
    refetch: favoriteRefetch,
  } = useQuery<StockDisplayInfo>({
    queryKey: ["favoriteDisplayInfo", email, start_date, end_date],
    queryFn: () => fetcher(`/api/defaultFavoriteDisplay?email=${email}&start_date=${start_date}&end_date=${end_date}`),
    enabled: !!email && !!start_date && !!end_date,
  });

  return {
    favoriteDisplayInfo,
    favoriteIsLoading,
    favoriteIsError,
    favoriteRefetch
  };
};