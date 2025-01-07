import {ReactNode} from 'react';

declare global {
  type ReactChildren = ReactNode;

  type EnvType = 'DEV' | 'QA' | 'STG' | 'PRD';

  type StorageKeys =
    | 'isUserLoggedIn'
    | 'id_token'
    | 'userData'
    | 'isOnboardingViewed'
    | 'FCM_TOKEN';

  type User = {
    firstName?: string;
    lastName?: string;
    userName?: string;
    id?: number;
    email?: string;
  };
  type UserDataStoreType = {
    userData: User;
    isOnboardingViewed: boolean;
    setUserData: (userData: User) => void;
  };
  export interface ZustandStorageType {
    getItem: (name: string) => string | null | Promise<string | null>;
    setItem: (name: string, value: string) => unknown | Promise<unknown>;
    removeItem: (name: string) => unknown | Promise<unknown>;
  }
}
