import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { useStockInfo } from "@/hooks/useStock";
import { EditFavoritesArgs, StockTableInfo } from "@/types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Session } from "next-auth";
import { useFavoritesMutation } from "@/hooks/useFavoritesMutation";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  session: Session | null;
};

function createColumns({
  email,
  postFavoritesMutation,
}: {
  postFavoritesMutation: UseMutationResult<
    void,
    unknown,
    EditFavoritesArgs,
    unknown
  >;
  email: string;
}): GridColDef<StockTableInfo>[] {
  const columns: GridColDef<StockTableInfo[][number]>[] = [
    {
      field: "IsFavorite",
      headerName: "",
      sortable: false,
      width: 30,
      disableColumnMenu: true,
      renderCell: (param) => {
        const isFavorite = param.row.IsFavorite;
        const stockId = param.row.StockId;

        const handleClick = () => {
          postFavoritesMutation.mutate({
            email: email,
            stockId: stockId,
            isFavorite,
          });
        };

        return (
          <>
            {email && (
              <div className="flex items-center justify-center h-full">
                <IconButton onClick={handleClick}>
                  {isFavorite ? (
                    <FavoriteIcon className="text-red-600" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </div>
            )}
          </>
        );
      },
    },
    {
      field: "StockId",
      headerName: "ID",
      width: 100,
      disableColumnMenu: true,
    },
    {
      field: "StockName",
      headerName: "Name",
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "StockCompany",
      headerName: "Company",
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "AvgPrice",
      headerName: "Average Price (Closing)",
      width: 200,
      valueGetter: (value, row) => row.AvgPrice.toFixed(2),
      disableColumnMenu: true,
    },
  ];
  return columns;
}

export default function StockDataGrid({ session }: Props) {
  const [stockQuery, setStockQuery] = useState<string>(" ");
  const [marketName, setMarketName] = useState<string>("USA");

  const markets = [
    { value: "USA", label: "United States of America" },
    { value: "Thai", label: "Thailand" },
  ];

  const { stockTableInfo, refetch } = useStockInfo({
    stockQuery: stockQuery.trim() != "" ? stockQuery.trim() : " ",
    marketName: marketName,
    email: session?.user?.email || "",
  });

  const postFavoritesMutation = useFavoritesMutation({
    method: "POST",
    onSuccess: () => {
      refetch();
    },
    onError: () => {},
  });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <TextField
          id="search-name-company"
          label="Name/Company"
          value={stockQuery}
          onChange={(event) => {
            setStockQuery(event.target.value);
          }}
        />

        <TextField
          id="select-market"
          label="Market"
          select
          defaultValue="USA"
          value={marketName}
          onChange={(event) => {
            setMarketName(event.target.value);
          }}
        >
          {markets.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ height: 400, width: "100%", padding: 2 }}>
        {stockTableInfo ? (
          <DataGrid
            rows={stockTableInfo}
            columns={createColumns({
              email: session?.user?.email || "",
              postFavoritesMutation: postFavoritesMutation,
            })}
            getRowId={(row) => row.StockId}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
            }}
          />
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
}
