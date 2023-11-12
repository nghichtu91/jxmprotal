import { Role } from '@/interface/user/login';

export interface IUserEntity {
  id: string;
  userName: string;
  phone?: string;
  point1: number;
  question?: string;
  answer?: string;
  isNew?: boolean;
  passwordNoEncrypt?: string;
  secPasswordNoEncrypt?: string;
  role?: Role;
  isPlay: boolean;
  locked: boolean;
  createdAt?: string;
  email?: string;
}

export interface IUserData {
  id: string;
  userName: string;
  phone?: string;
  point1: number;
  question?: string;
  answer?: string;
  updateInfo?: string;
  passwordNoEncrypt?: string;
  secPasswordNoEncrypt?: string;
  roles?: [Role];
  point: number; // tình trạng
  createdAt?: Date;
  iClientID?: number; // trạng thái
  email?: string;
}
