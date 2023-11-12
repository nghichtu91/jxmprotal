/* eslint-disable max-len */
import axios from 'axios';
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IHttpClient } from './interfaces/IHttpClient';

const baseURL = `${location.protocol}//${import.meta.env.VITE_API_URL as string}`;
const loginUrl = `${location.protocol}//${import.meta.env.VITE_URL_LOGIN as string}` as string;

class HttpClient implements IHttpClient {
  private source = axios.CancelToken.source();
  private instance: AxiosInstance = Axios.create({
    baseURL: baseURL,
    cancelToken: this.source.token,
  });

  private isRefreshing = false;

  constructor() {
    this.init();
  }

  static onResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  static onResponseError(error: AxiosError): Promise<AxiosError> {
    // console.log(error.response?.status, error.config.url);
    // const originalRequest = error.config;
    const url = error.config?.url;

    if (error.response?.status === 401) {
      if (url === 'user/menus' || url === 'user/me' || url === 'auth/login') {
      } else {
        // alert('Hết hiệu lực đăng nhập.');
        window.location.href = loginUrl;

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }

  private init(): void {
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

  // remove token headers
  public removeToken(): Promise<boolean> {
    this.instance = Axios.create({
      baseURL: baseURL,
      cancelToken: this.source.token,
    });

    return Promise.resolve(true);
  }

  public getInstance(token?: string): AxiosInstance {
    this.instance.interceptors.response.use(HttpClient.onResponse, HttpClient.onResponseError);
    if (this.tokenLocal()) {
      this.setToken(token);
    }

    return this.instance;
  }
}

export default HttpClient;
