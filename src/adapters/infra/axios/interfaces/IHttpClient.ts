import { AxiosInstance } from 'axios';

export interface IHttpClient {
  setToken(token: string): void;
  getInstance(token?: string): AxiosInstance;
}
