/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="@emotion/react/types/css-prop" />

import { AppState } from './stores';

declare module 'react-redux' {
  export interface DefaultRootState extends AppState {}
}

// declare interface ObjectConstructor {
//   keys<T>(o: T): (keyof T)[];
// }

// declare global {
//   export type YN = 'Y' | 'N';
// }

interface ImportMetaEnv {
  readonly VITE_HOME_TITLE: string;
  readonly VITE_CUSTOMER_REF: string;
  readonly VITE_PLAT_FORM: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
