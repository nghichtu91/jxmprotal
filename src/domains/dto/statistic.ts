type DataType = 'register' | 'download' | 'bill';

export interface Values {
  type: DataType;
  value: number;
  date: string;
}

export interface IStatisticByYearDTO {
  label: string;
  value: number;
}

export interface IStatisticTotalsDTO {
  accounts: number;
  payments: number;
  money: number;
  moneyToday: number;
}

export interface IStatisticByYearParams {
  year: number;
}

export interface IStatisticByFormToParams {
  form?: string;
  to?: string;
}
