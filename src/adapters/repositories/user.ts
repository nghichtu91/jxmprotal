import { SmsActions } from '@/constants';
import { IAddXuDTO, IUserUpdateDTO } from '@/domains/dto';
import { ICreatePaymentDTO } from '@/domains/dto/payment/create.dto';
import { IPaymentDTO } from '@/domains/dto/payment/payment.dto';
import { ISmsCreateParams } from '@/domains/dto/sms';
import { IUserCreateDto } from '@/domains/dto/user/create.dto';
import { ILoginParams } from '@/domains/dto/user/login.dto';
import { IUserDto } from '@/domains/dto/user/user.dto';
import { IUserRepository } from '@/domains/useCases/interfaces/user';
import { PageParams, PageData, IBaseResponse } from '@/interface';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { IHttpClient } from '../infra/axios/interfaces/IHttpClient';

/**
 * @class UserRepository
 * @alias
 * @classdesc Xử lý các usecase của user.
 * @version v1.0.0
 * @author <nhatthanh5891@gmail.com>
 */

export interface IAuthReponse {
  accessToken: string;
  refreshToken: string;
}

export interface IBasicResponse {
  statusCode?: number;
  message?: [string];
  data?: any;
}

class UserRepository implements IUserRepository {
  axiosInstance: AxiosInstance;
  readonly store;
  baseURL: string = import.meta.env.VITE_API_URL as string;
  constructor(readonly httpClient: IHttpClient) {
    this.axiosInstance = httpClient.getInstance();
    this.axiosInstance.defaults.baseURL = this.baseURL;
    this.store = typeof window !== 'undefined' ? localStorage : undefined;
  }

  async unlockOrLock<T>(username: string, params: T): Promise<boolean> {
    try {
      await this.axiosInstance.patch<T>(`admin/users/${username}/unlockOrLock`, params);

      return true;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_ADMIN_UNLOCK_OR_LOCK_USERS_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBaseResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message;
      }

      throw new Error(errorCode);
    }
  }

  async smsRequest(params: ISmsCreateParams, action: SmsActions): Promise<string> {
    try {
      const { data } = await this.axiosInstance.post<IBaseResponse>(`sms/sms-request/${action}`, params);

      return data.message || '';
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_USERS_SMS_REQUEST_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBaseResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message;
      }

      throw new Error(errorCode);
    }
  }

  async settings<T, V>(params: T): Promise<V> {
    try {
      const { data } = await this.axiosInstance.get<V>(`user/menus`, {
        params: params,
      });

      return data;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_GET_MENUS_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBaseResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message;
      }

      throw new Error(errorCode);
    }
  }

  async statistic<T, V>(params: T, action: string): Promise<V> {
    try {
      const { data } = await this.axiosInstance.get<V>(`admin/statistic/${action}`, {
        params: params,
      });

      return data;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_ADMIN_GET_STATISTIC_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBaseResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message;
      }

      throw new Error(errorCode);
    }
  }

  async addCoin<T>(params: T): Promise<boolean> {
    const v = params as unknown as IAddXuDTO;

    try {
      await this.axiosInstance.patch(`admin/users/${v.userName}/addxu`, {
        point: v.point1,
      });

      return true;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_ADMIN_GET_USERS_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBaseResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message;
      }

      throw new Error(errorCode);
    }
  }

  async list<T>(params: T): Promise<PageData<IUserDto>> {
    try {
      const { data } = await this.axiosInstance.get<PageData<IUserDto>>(`admin/users`, {
        params: params,
      });

      return data;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_ADMIN_GET_USERS_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBaseResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message;
      }

      throw new Error(errorCode);
    }
  }

  async forgotPassword<T>(params: T): Promise<boolean> {
    try {
      await this.axiosInstance.post(`/auth/forgot`, params);

      return true;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_USER_FORGOT_PASSWORD_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBaseResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message;
      }

      throw new Error(errorCode);
    }
  }

  async update<T>(params: T, action: string, username: string): Promise<boolean> {
    try {
      await this.axiosInstance.patch(`user/${username}/${action}`, params);

      return true;
    } catch (error) {
      let errorCode: string | undefined = `EXCEPTION_UPDATE_USER_${action.toUpperCase()}_ERROR`;

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBaseResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message;
      }

      throw new Error(errorCode);
    }
  }

  async paymentHistories(params: PageParams = { paged: 1 }, userName: string): Promise<PageData<IPaymentDTO>> {
    try {
      const { data } = await this.axiosInstance.get<PageData<IPaymentDTO>>(`payments/${userName}`, {
        params: params,
      });

      return data;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_GET_PAYMENT_HISTORIES_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBasicResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message?.join(',');
      }

      throw new Error(errorCode);
    }
  }

  async updateInfo(params: IUserUpdateDTO, username: string): Promise<boolean> {
    try {
      await this.axiosInstance.patch(`user/${username}`, params);

      return true;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_GET_USER_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBasicResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message?.join(',');
      }

      throw new Error(errorCode);
    }
  }

  async me(): Promise<IUserDto> {
    try {
      const token = this.store?.getItem('NT91_HA_ACCESS_TOKEN') as string;

      this.axiosInstance = this.httpClient.getInstance(token);

      const { data } = await this.axiosInstance.get<IUserDto>('user/me');

      return data;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_GET_USER_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBasicResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message?.join(',');
      }

      throw new Error(errorCode);
    }
  }

  removeToken(): void {
    if (this.store) {
      this.store.removeItem('NT91_HA_ACCESS_TOKEN');
      this.store.removeItem('NT91_HA_REFRESH_TOKEN');
    }
  }

  async setToken(token: string, refreshToken?: string): Promise<void> {
    if (this.store) {
      this.store.setItem('NT91_HA_ACCESS_TOKEN', token);
      refreshToken && this.store.setItem('NT91_HA_REFRESH_TOKEN', refreshToken);
    }

    return Promise.resolve();
  }

  async signUp(params: IUserCreateDto): Promise<boolean> {
    this.removeToken();

    try {
      const { data } = await this.axiosInstance.post<IAuthReponse>('auth/register', params);

      await this.setToken(data.accessToken, data.refreshToken);
      this.httpClient.setToken(data.accessToken);

      return true;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_GET_HOLIDAYS_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBasicResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message?.join(',');
      }

      throw new Error(errorCode);
    }
  }

  async login(params: ILoginParams): Promise<boolean> {
    this.removeToken();

    try {
      const { data } = await this.axiosInstance.post<IAuthReponse>('auth/login', params);

      await this.setToken(data.accessToken, data.refreshToken);
      this.httpClient.setToken(data.accessToken);

      return true;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_LOGIN_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBaseResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message;
      }

      throw new Error(errorCode);
    }
  }

  logout(): Promise<boolean> {
    this.removeToken();

    return Promise.resolve(true);
  }

  changePassword(params: any): Promise<boolean> {
    console.log(params);

    throw new Error('Method not implemented.');
  }

  async payment(params: ICreatePaymentDTO): Promise<IBaseResponse> {
    try {
      const { data } = await this.axiosInstance.post<IBaseResponse>('payments/gateway/mobi', params);

      return data;
    } catch (error) {
      let errorCode: string | undefined = 'EXCEPTION_GET_USER_PAYMENT_ERROR';

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IBaseResponse>;
        const responeData = serverError.response?.data;

        errorCode = responeData?.message;
      }

      throw new Error(errorCode);
    }
  }
}

export default UserRepository;
