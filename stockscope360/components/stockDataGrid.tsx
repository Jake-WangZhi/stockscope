import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, CircularProgress, MenuItem, TextField } from "@mui/material";
import { searchStockInfo } from "@/hooks/searchStock";
import { StockTableInfo } from '@/types';


const columns: GridColDef<(StockTableInfo[])[number]>[] = [
  {
    field: 'StockId',
    headerName: 'ID',
    width: 50,
  },
  {
    field: 'StockName',
    headerName: 'Name',
    width: 200,
  },
  {
    field: 'StockCompany',
    headerName: 'Company',
    width: 200,
  },
  {
    field: 'AvgPrice',
    headerName: 'Average Price (Closing)',
    width: 200,
    valueGetter: (value, row) => row.AvgPrice.toFixed(2),
  },
];

export default function StockDataGrid() {
  const [stockQuery, setStockQuery] = React.useState<string>(" ")
  const [marketName, setMarketName] = React.useState<string>("USA")

  const markets = [
    { value: 'USA', label: 'United States of America' },
    { value: 'Thai', label: 'Thailand' },
  ];

  const { stockTableInfo, isLoading, isError } = searchStockInfo({
    stockQuery: stockQuery.trim() != "" ? stockQuery.trim() : " ",
    marketName: marketName,
  });

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
      >
        <TextField
          id="search-name-company"
          label="Name/Company"
          value={stockQuery}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setStockQuery(event.target.value);
          }}
        />

        <TextField
          id="select-market"
          label="Market"
          select
          defaultValue="USA"
          value={marketName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
      
      <Box sx={{ height: 400, width: '100%', padding: 2 }}>
        { stockTableInfo ?
          <DataGrid
            rows={stockTableInfo}
            columns={columns}
            getRowId={(row) => row.StockId}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          /> : 
          <CircularProgress />
        }
      </Box>
    </Box>
    
  );
}