export interface UserInfo {
  UserId: number;
  CurrencyName: string;
  FirstName: string;
  LastName: string;
  DisplayName: string;
  Email: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface StockTableInfo {
  IsFavorite: boolean;
  StockId: number;
  StockName: string;
  StockCompany: string;
  AvgPrice: number;
}

export interface IndustryInfo {
  Industry: string;
}

export interface NewUserArgs {
  name: string;
  email: string;
  currency?: string;
}

export interface EditFavoritesArgs {
  email: string;
  stockId: number;
  isFavorite: boolean;
}
export interface StockDisplayInfo {
  StockId: number;
  StockName: string;
  Year: number;
  Month: number;
  AvgClosingPrice: number;
}