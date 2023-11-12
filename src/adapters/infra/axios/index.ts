/* eslint-disable max-len */
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IHttpClient } from './interfaces/IHttpClient';

// const isRefreshing = false;

class HttpClient implements IHttpClient {
  private instance: AxiosInstance = Axios.create({});

  constructor() {
    this.init();
  }

  static onResponse(response: AxiosResponse): AxiosResponse {
    // console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
  }

  async onResponseError(error: AxiosError): Promise<AxiosError> {
    // const originalRequest = error.config;

    // if (error.response?.status === 401 && !isRefreshing) {
    //   isRefreshing = true;
    //   console.log(isRefreshing);
    // }

    return Promise.reject(error);
  }

  private init(): void {
    const baseURL: string = import.meta.env.VITE_API_URL as string;

    if (!this.instance) {
      this.instance = Axios.create({
        baseURL: baseURL,
      });
      this.instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }
  }

  private tokenLocal = () => {
    return typeof window !== 'undefined' ? localStorage.getItem('NT91_HA_ACCESS_TOKEN') : '';
  };

  public setToken(token?: string | null) {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const newconfig = config;

      newconfig.headers = {
        ...newconfig.headers,
      };
      if (token) {
        newconfig.headers.Authorization = `Bearer ${token}`;
      }
      if (!token) {
        const tokenInLocal = this.tokenLocal();

        if (tokenInLocal) {
          newconfig.headers.Authorization = `Bearer ${tokenInLocal}`;
        }
      }

      return newconfig;
    });
  }

  public getInstance(token?: string): AxiosInstance {
    this.instance.interceptors.response.use(HttpClient.onResponse, this.onResponseError);

    if (this.tokenLocal()) {
      this.setToken(token);
    }

    return this.instance;
  }
}

export default HttpClient;
