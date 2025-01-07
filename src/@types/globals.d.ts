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
}
