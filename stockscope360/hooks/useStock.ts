import { fetcher } from "@/libs/utils";
import { StockTableInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";

type searchStockArgs = {
  stockQuery: string;
  marketName: string;
  email: string;
};

export const useStockInfo = ({
  stockQuery,
  marketName,
  email,
}: searchStockArgs) => {
  const {
    isError,
    data: stockTableInfo,
    isLoading,
    refetch,
  } = useQuery<StockTableInfo[]>({
    queryKey: ["searchStock", stockQuery, marketName],
    queryFn: () =>
      fetcher(
        `/api/searchStock?stockQuery=${stockQuery}&marketName=${marketName}${
          email ? `&email=${email}` : ""
        }`
      ),
    enabled: !!stockQuery && !!marketName,
  });

  return {
    stockTableInfo,
    isLoading,
    isError,
    refetch,
  };
};
