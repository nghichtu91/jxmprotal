import { IUserDto } from './user.dto';

export type IUserForgotPassWord = Pick<IUserDto, 'answer' | 'phone' | 'question' | 'userName' | 'passWord'>;
