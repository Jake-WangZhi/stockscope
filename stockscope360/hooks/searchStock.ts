import { fetcher } from "@/libs/utils";
import { StockTableInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";

type searchStockArgs = {
  stockQuery: string;
  marketName: string;
};

export const searchStockInfo = ({ stockQuery, marketName }: searchStockArgs) => {
  const {
    isError,
    data: stockTableInfo,
    isLoading,
  } = useQuery<StockTableInfo[]>({
    queryKey: ["searchStock", stockQuery, marketName],
    queryFn: () => fetcher(`/api/searchStock/${stockQuery}/${marketName}`),
    enabled: !!stockQuery && !!marketName,
  });

  return {
    stockTableInfo,
    isLoading,
    isError,
  };
};
