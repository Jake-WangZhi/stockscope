import { fetcher } from "@/libs/utils";
import { StockDisplayInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";

type Args = {
  start_date: String;
  end_date: String;
  stockIds: string[];
};

export const useDefaultDisplayInfo = ({
  start_date,
  end_date,
  stockIds,
}: Args) => {
  const { isError, data, isLoading, refetch } = useQuery<StockDisplayInfo>({
    queryKey: ["defaultDisplayInfo", start_date, end_date, stockIds],
    queryFn: () =>
      fetcher(
        `/api/defaultFavoriteDisplay?start_date=${start_date}&end_date=${end_date}&stockIds=${stockIds.join(
          ","
        )}`
      ),
    enabled: !!start_date && !!end_date && stockIds.length > 0,
  });

  return {
    defaultDisplayInfo: data,
    defaultIsLoading: isLoading,
    defaultIsError: isError,
    defaultRefetch: refetch,
  };
};
