import { AdminActions, SmsActions } from '@/constants';
import { PageParams, PageData, IBaseResponse } from '@/interface';
import { IUserUpdateDTO } from '../dto';
import { ICreatePaymentDTO } from '../dto/payment/create.dto';
import { ISmsCreateParams } from '../dto/sms';
import { IUserCreateDto } from '../dto/user/create.dto';
import { ILoginParams } from '../dto/user/login.dto';
import { IUserEntity } from '../entities/interfaces';
import { IPaymentEntity } from '../entities/interfaces/IPayment';
import { PaymentEntity } from '../entities/payment.entity';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository, IUserUseCase } from './interfaces/user';
import { GiftCodeEntity } from '../entities/giftcode.entity';
/**
 *
 */
class UserUseCase implements IUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}
  adminDeleteGiftcodes(id: number): Promise<boolean> {
    return this.userRepo.adminDeleteGiftcodes(id);
  }
  adminGiftcodes<T>(params: T): Promise<PageData<GiftCodeEntity>> {
    return this.userRepo.adminGiftcodes<T>(params);
  }
  adminCreateGiftCode<T, V>(params?: T | undefined): Promise<PageData<V>> {
    return this.userRepo.adminCreateGiftCode<T, V>(params);
  }

  async adminPaymentAction<T, V>(paymentId: number, action: string, params?: T | undefined) {
    return await this.userRepo.adminPaymentAction<T, V>(paymentId, action, params);
  }

  async adminPaymentHistories<T>(params: T, username?: string | undefined): Promise<PageData<IPaymentEntity>> {
    const { pageNum, pageSize, total, data } = await this.userRepo.adminPaymentHistories(params, username);

    return {
      pageNum: pageNum,
      pageSize: pageSize,
      total: total,
      data: data.map(p => new PaymentEntity(p)),
    };
  }

  resetAccount<T>(params: T, username: string): Promise<boolean> {
    return this.userRepo.adminActions(params, username, AdminActions.RESET_ACCOUNT);
  }

  unlockOrLock<T>(username: string, params: T): Promise<boolean> {
    return this.userRepo.unlockOrLock<T>(username, params);
  }

  smsRequest(params: ISmsCreateParams, action: SmsActions): Promise<string> {
    return this.userRepo.smsRequest(params, action);
  }

  settings<T, V>(params: T): Promise<V> {
    return this.userRepo.settings<T, V>(params);
  }

  statistic<T, V>(params: T, action: string): Promise<V> {
    return this.userRepo.statistic<T, V>(params, action);
  }
  /**
   *
   * @param {T} params
   */
  addCoin<T>(params: T): Promise<boolean> {
    return this.userRepo.addCoin<T>(params);
  }

  async list<T>(params: T): Promise<PageData<IUserEntity>> {
    const { pageNum, pageSize, data, total } = await this.userRepo.list<T>(params);

    return {
      pageNum: pageNum,
      pageSize: pageSize,
      total: total,
      data: data.map(d => new UserEntity(d)),
    };
  }

  forgotPassword<T>(params: T): Promise<boolean> {
    return this.userRepo.forgotPassword<T>(params);
  }

  /**
   *
   * @param {T} parrams
   * @param {string} action
   * @returns {Promise<boolean>}
   */
  update<T>(parrams: T, action: string, username: string): Promise<boolean> {
    return this.userRepo.update<T>(parrams, action, username);
  }

  updateInfo(params: IUserUpdateDTO, username: string): Promise<boolean> {
    return this.userRepo.updateInfo(params, username);
  }

  async me(): Promise<IUserEntity> {
    try {
      const userDto = await this.userRepo.me();

      return new UserEntity(userDto);
    } catch (e) {
      throw new Error();
    }
  }

  signUp(params: IUserCreateDto): Promise<boolean> {
    return this.userRepo.signUp(params);
  }

  login(params: ILoginParams): Promise<boolean> {
    return this.userRepo.login(params);
  }

  logout(): Promise<boolean> {
    return this.userRepo.logout();
  }

  changePassword(params: any): Promise<boolean> {
    console.log(params);

    return this.userRepo.changePassword(params);
  }

  payment(params: ICreatePaymentDTO, paymenttype: string): Promise<IBaseResponse> {
    return this.userRepo.payment(params, paymenttype);
  }

  async paymentHistories(params: PageParams, userName: string): Promise<PageData<IPaymentEntity>> {
    const { pageNum, pageSize, total, data } = await this.userRepo.paymentHistories(params, userName);

    return {
      pageNum: pageNum,
      pageSize: pageSize,
      total: total,
      data: data.map(p => new PaymentEntity(p)),
    };
  }
}

export default UserUseCase;
