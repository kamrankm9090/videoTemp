declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    BASE_URL?: string;
    GOOGLE_WEB_CLIENT_ID?: string;
    GOOGLE_IOS_CLIENT_ID?: string;
    LINKING_URL?: string;
    CDN_URL?: string;
    BLOB_URL?: string;
    ENVIRONMENT?: 'DEV' | 'QA' | 'STG' | 'PRD';
  }

  export const Config: NativeConfig;
  export default Config;
}
