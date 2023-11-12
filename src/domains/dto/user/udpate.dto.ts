import { IUserDto } from './user.dto';

export type IUserUpdateDTO = {
  passWordSecond?: string;
} & Pick<IUserDto, 'answer' | 'question'>;

/**
 * các thông tin cần kiểm tra
 */
export type FiledsCheck = { sms: boolean } & Pick<IUserDto, 'answer' | 'question' | 'phone' | 'passWordSecond'>;

export type IUserChangeSecretQuestion = {
  newSecretQuestion: string;
  newAnswer: string;
} & FiledsCheck;

export type IUserChangeSecPassword = {
  newPassWordSecond: string;
} & FiledsCheck;

export type IUserChangePassword = {
  confirmNewPassword: string;
  passWord?: string;
} & FiledsCheck;

export type IUserChangePhone = {
  newPhone?: string;
} & FiledsCheck;

export type IUserUnlockEquipment = FiledsCheck;

export type IAddXuDTO = Pick<IUserDto, 'point1' | 'userName'>;
export type IUnlockOrLock = Pick<IUserDto, 'point'>;
