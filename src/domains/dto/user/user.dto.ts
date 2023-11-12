import { Role } from '@/interface/user/login';

export interface IUserDto {
  id: string;
  userName: string;
  phone?: string;
  point1: number;
  question?: string;
  answer?: string;
  updateInfo?: string;
  passWordSecond?: string;
  roles?: [Role];
  point: number;
  createdAt?: Date;
  iClientID: number;
  email?: string;
}
