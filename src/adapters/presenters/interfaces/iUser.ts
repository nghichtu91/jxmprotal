import { SmsActions } from '@/constants';
import { IUserUpdateDTO } from '@/domains/dto';
import { ICreatePaymentDTO } from '@/domains/dto/payment/create.dto';
import { ISmsCreateParams } from '@/domains/dto/sms';
import { IUserCreateDto } from '@/domains/dto/user/create.dto';
import { ILoginParams } from '@/domains/dto/user/login.dto';
import { GiftCodeEntity } from '@/domains/entities/giftcode.entity';
import { IUserEntity } from '@/domains/entities/interfaces';
import { IPaymentEntity } from '@/domains/entities/interfaces/IPayment';
import { IBaseResponse, PageData, PageParams } from '@/interface';

export interface IUserPresenter {
  signUp(params: IUserCreateDto): Promise<boolean>;
  login(params: ILoginParams): Promise<boolean>;
  logout(): Promise<boolean>;
  changePassword(params: any): Promise<boolean>;
  payment(params: ICreatePaymentDTO, paymenttype: string): Promise<IBaseResponse>;
  me(): Promise<IUserEntity>;
  updateInfo(params: IUserUpdateDTO, username: string): Promise<boolean>;
  paymentHistories(params: PageParams, userName: string): Promise<PageData<IPaymentEntity>>;
  update<T>(parrams: T, action: string, username: string): Promise<boolean>;
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
  adminPaymentAction<T, V>(paymentId: number, action: string, params?: T): Promise<PageData<V>>;
  adminCreateGiftCode<T, V>(params?: T): Promise<PageData<V>>;
  adminGiftcodes<T>(params: T): Promise<PageData<GiftCodeEntity>>;
  adminDeleteGiftcodes(id: number): Promise<boolean>;
}
