export interface Locales<T = any> {
  /** Chinese */
  zh_CN: T;
  /** English */
  en_US: T;
}

export type Language = keyof Locales;

export interface PageData<T> {
  pageNum: number;
  pageSize: number;
  total: number;
  data: T[];
}

export interface PageParams {
  paged: number;
}

export interface IBaseResponse {
  message?: string;
}

export interface IMonthLineChart {
  type: string;
  value: number;
  date: string;
}
