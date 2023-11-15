import { SmsActions } from '@/constants';
import { IUserUpdateDTO } from '@/domains/dto';
import { ICreatePaymentDTO } from '@/domains/dto/payment/create.dto';
import { ISmsCreateParams } from '@/domains/dto/sms';
import { IUserCreateDto } from '@/domains/dto/user/create.dto';
import { IUserEntity } from '@/domains/entities/interfaces';
import { IPaymentEntity } from '@/domains/entities/interfaces/IPayment';
import { IUserUseCase } from '@/domains/useCases/interfaces/user';
import { PageParams, PageData, IBaseResponse } from '@/interface';
import { IUserPresenter } from './interfaces/iUser';

class UserPresenter implements IUserPresenter {
  constructor(private readonly userUseCase: IUserUseCase) {}
  adminPaymentAction<T, V>(paymentId: number, action: string, params?: T | undefined): Promise<PageData<V>> {
    return this.userUseCase.adminPaymentAction<T, V>(paymentId, action, params);
  }

  adminPaymentHistories<T>(params: T, username: string): Promise<PageData<IPaymentEntity>> {
    return this.userUseCase.adminPaymentHistories<T>(params, username);
  }

  resetAccount<T>(params: T, username: string): Promise<boolean> {
    return this.userUseCase.resetAccount<T>(params, username);
  }

  unlockOrLock<T>(username: string, params: T): Promise<boolean> {
    return this.userUseCase.unlockOrLock<T>(username, params);
  }

  /**
   *
   * @param {ISmsCreateParams} params
   * @param {SmsActions} action
   * @returns {Promise<boolean>}
   */
  smsRequest(params: ISmsCreateParams, action: SmsActions): Promise<string> {
    return this.userUseCase.smsRequest(params, action);
  }

  /**
   *
   * @param {T} params
   * @returns {Promise<V>}
   */
  settings<T, V>(params: T): Promise<V> {
    return this.userUseCase.settings<T, V>(params);
  }

  /**
   *
   * @param {T} params
   * @param {string} action
   * @returns {Promise<V>}
   */
  statistic<T, V>(params: T, action: string): Promise<V> {
    return this.userUseCase.statistic<T, V>(params, action);
  }

  addCoin<T>(params: T): Promise<boolean> {
    return this.userUseCase.addCoin<T>(params);
  }

  list<T>(params: T): Promise<PageData<IUserEntity>> {
    return this.userUseCase.list<T>(params);
  }
  forgotPassword<T>(params: T): Promise<boolean> {
    return this.userUseCase.forgotPassword<T>(params);
  }
  update<T>(params: T, action: string, username: string): Promise<boolean> {
    return this.userUseCase.update<T>(params, action, username);
  }
  paymentHistories(params: PageParams, userName: string): Promise<PageData<IPaymentEntity>> {
    return this.userUseCase.paymentHistories(params, userName);
  }

  updateInfo(params: IUserUpdateDTO, username: string): Promise<boolean> {
    return this.userUseCase.updateInfo(params, username);
  }

  me(): Promise<IUserEntity> {
    return this.userUseCase.me();
  }

  signUp(params: IUserCreateDto): Promise<boolean> {
    return this.userUseCase.signUp(params);
  }

  login(params: any): Promise<boolean> {
    return this.userUseCase.login(params);
  }

  logout(): Promise<boolean> {
    return this.userUseCase.logout();
  }

  changePassword(params: any): Promise<boolean> {
    return this.userUseCase.changePassword(params);
  }

  payment(params: ICreatePaymentDTO): Promise<IBaseResponse> {
    return this.userUseCase.payment(params);
  }
}

export default UserPresenter;
