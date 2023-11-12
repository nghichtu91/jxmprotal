import { IUserEntity } from '@/domains/entities/interfaces';
import { Device } from '@/interface/layout/index.interface';
import { MenuChild } from '@/interface/layout/menu.interface';
import { Role } from './login';

export type Locale = 'zh_CN' | 'en_US';

export type UserState = {
  username: string;

  /** menu list for init tagsView */
  menuList: MenuChild[];

  /** login status */
  logged: boolean;

  role: Role;

  /** user's device */
  device: Device;

  /** menu collapsed status */
  collapsed: boolean;

  /** notification count */
  noticeCount: number;

  /** user's language */
  locale: Locale;

  /** Is first time to view the site ? */
  newUser: boolean;

  question?: string;
  answer?: string;
} & Pick<IUserEntity, 'email' | 'point1' | 'phone' | 'isPlay' | 'locked' | 'createdAt'>;
