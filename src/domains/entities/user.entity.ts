import { Role } from '@/interface/user/login';
import dayjs from 'dayjs';
import { IUserData, IUserEntity } from './interfaces';

export class UserEntity implements IUserEntity {
  private readonly _id: string;
  private readonly _userName: string;
  private readonly _phone?: string;
  private readonly _point1: number;
  private readonly _question?: string;
  private readonly _answer?: string;
  private readonly _isNewUser: boolean;
  private readonly _passwordNoEncrypt?: string;
  private readonly _secPasswordNoEncrypt?: string;
  private readonly _roles?: [Role];

  private readonly _isPlay: boolean;
  private readonly _createdAt?: string;
  private readonly _locked: boolean;

  constructor(params: IUserData) {
    this._id = params.id;
    this._phone = params.phone;
    this._point1 = params.point1 || 0;
    this._userName = params.userName;
    this._question = params.question;
    this._answer = params.answer;
    this._isNewUser = params.updateInfo !== '1         ';
    this._passwordNoEncrypt = params.passwordNoEncrypt;
    this._secPasswordNoEncrypt = params.secPasswordNoEncrypt;
    this._roles = params.roles || ['GUEST'];
    this._isPlay = params.iClientID !== undefined && params.iClientID > 0;
    this._locked = params.point < 1;
    this._createdAt = dayjs(params.createdAt).format('DD/MM/YYYY HH:mm');
  }

  get id() {
    return this._id;
  }

  get userName() {
    return this._userName;
  }

  get phone() {
    return this._phone;
  }

  get point1() {
    return this._point1;
  }

  get question() {
    return this._question;
  }

  get answer() {
    return this._answer;
  }

  get isNew() {
    return this._isNewUser;
  }

  get passwordNoEncrypt() {
    return this._passwordNoEncrypt;
  }

  get secPasswordNoEncrypt() {
    return this._secPasswordNoEncrypt;
  }

  get role() {
    return this._roles?.[0];
  }

  get createdAt() {
    return this._createdAt;
  }

  get isPlay() {
    return this._isPlay;
  }

  get locked() {
    return this._locked;
  }
}
