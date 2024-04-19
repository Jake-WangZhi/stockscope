export interface UserInfo {
  UserId: number;
  CurrencyId: number;
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

export interface NewUserArgs {
  name: string;
  email: string;
}

export interface EditFavoritesArgs {
  email: string;
  stockId: number;
  isFavorite: boolean;
}
