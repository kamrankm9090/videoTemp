declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    BASE_URL?: string;
    GOOGLE_WEB_CLIENT_ID?: string;
    GOOGLE_IOS_CLIENT_ID?: string;
    CDN_URL?: string;
    ENVIRONMENT?: 'DEV' | 'QA' | 'STG' | 'PRD';
  }

  export const Config: NativeConfig;
  export default Config;
}
