/** user's role */
export type Role = 'GUEST' | 'ADMIN' | 'CUSTOMER';

export interface LoginParams {
  /** 用户名 */
  username: string;
  /** 用户密码 */
  password: string;
}

export interface LoginResult {
  /** auth token */
  accessToken?: string;
  username?: string;
  refreshToken?: string;
  role: Role;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
