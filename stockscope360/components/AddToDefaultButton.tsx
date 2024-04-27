import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "@mui/material";

type Props = {
  stockId: string;
  setIsStockIdsChanged: Dispatch<SetStateAction<boolean>>;
};

export default function AddToDefaultButton({
  stockId,
  setIsStockIdsChanged,
}: Props) {
  const [isExist, setIsExist] = useState(false);
  const [stockIds, setStockIds] = useState(() => {
    const storedValue = localStorage.getItem("stockIds");
    return storedValue ? JSON.parse(storedValue) : [];
  });

  useEffect(() => {
    if (stockIds.includes(stockId)) setIsExist(true);
    else setIsExist(false);
  }, [stockId, stockIds]);

  const handleClick = useCallback(() => {
    let updatedStockIds;
    if (stockIds.includes(stockId))
      updatedStockIds = stockIds.filter((id: string) => id !== stockId);
    else updatedStockIds = [...stockIds, stockId];

    setStockIds(updatedStockIds);
    localStorage.setItem("stockIds", JSON.stringify(updatedStockIds));

    setIsStockIdsChanged(true);
  }, [setIsStockIdsChanged, stockId, stockIds]);

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {isExist ? " Delete from Default Plot" : " Add to Default Plot"}
    </Button>
  );
}
