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
  StockId: number;
  StockName: string;
  StockCompany: string;
  AvgPrice: number
}

export interface NewUserArgs {
  name: string;
  email: string;
}
