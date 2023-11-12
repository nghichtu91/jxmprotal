/**
 * định nghĩa các link apis
 */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';
export enum APIS_URL {
  signIn = 'auth/signin',
  signUp = 'auth/signup',
  settings = '',
}
