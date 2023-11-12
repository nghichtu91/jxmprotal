import { AdminActions, SmsActions } from '@/constants';
import { IUserUpdateDTO } from '@/domains/dto';
import { ICreatePaymentDTO } from '@/domains/dto/payment/create.dto';
import { IPaymentDTO } from '@/domains/dto/payment/payment.dto';
import { ISmsCreateParams } from '@/domains/dto/sms';
import { IUserCreateDto } from '@/domains/dto/user/create.dto';
import { ILoginParams } from '@/domains/dto/user/login.dto';
import { IUserDto } from '@/domains/dto/user/user.dto';
import { IUserEntity } from '@/domains/entities/interfaces';
import { IPaymentEntity } from '@/domains/entities/interfaces/IPayment';
import { IBaseResponse, PageData, PageParams } from '@/interface';

export interface IUserUseCase {
  signUp(params: IUserCreateDto): Promise<boolean>;
  login(params: ILoginParams): Promise<boolean>;
  logout(): Promise<boolean>;
  changePassword(params: any): Promise<boolean>;
  payment(params: ICreatePaymentDTO): Promise<IBaseResponse>;
  me(): Promise<IUserEntity>;
  updateInfo(params: IUserUpdateDTO, username: string): Promise<boolean>;
  paymentHistories(params: PageParams, userName: string): Promise<PageData<IPaymentEntity>>;
  update<T>(params: T, action: string, username: string): Promise<boolean>;
  forgotPassword<T>(params: T): Promise<boolean>;
  list<T>(params: T): Promise<PageData<IUserEntity>>;
  addCoin<T>(params: T): Promise<boolean>;
  statistic<T, V>(params: T, action: string): Promise<V>;
  settings<T, V>(params: T): Promise<V>;
  smsRequest(params: ISmsCreateParams, action: SmsActions): Promise<string>;
  unlockOrLock<T>(username: string, params: T): Promise<boolean>;

  // admin
  resetAccount<T>(params: T, username: string): Promise<boolean>;
  adminPaymentHistories<T>(params: T, username?: string): Promise<PageData<IPaymentEntity>>;
}

export interface IUserRepository {
  signUp(params: IUserCreateDto): Promise<boolean>;
  login(params: ILoginParams): Promise<boolean>;
  logout(): Promise<boolean>;
  changePassword(params: any): Promise<boolean>;
  payment(params: ICreatePaymentDTO): Promise<IBaseResponse>;
  me(): Promise<IUserDto>;
  updateInfo(params: IUserUpdateDTO, username: string): Promise<boolean>;
  paymentHistories(params: PageParams, userName: string): Promise<PageData<IPaymentDTO>>;
  update<T>(parrams: T, action: string, username: string): Promise<boolean>;
  forgotPassword<T>(params: T): Promise<boolean>;
  list<T>(params: T): Promise<PageData<IUserDto>>;
  addCoin<T>(params: T): Promise<boolean>;
  statistic<T, V>(params: T, action: string): Promise<V>;
  settings<T, V>(params: T): Promise<V>;
  smsRequest(params: ISmsCreateParams, action: SmsActions): Promise<string>;
  unlockOrLock<T>(username: string, params: T): Promise<boolean>;
  // admin
  adminActions<T>(params: T, username: string, action: AdminActions): Promise<boolean>;
  adminPaymentHistories<T>(params: T, username?: string): Promise<PageData<IPaymentDTO>>;
}
