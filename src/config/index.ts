import Config from 'react-native-config';

type appConfig = {
  apiURL: string;
  baseURL: string;
  cdnURL: string;
  blobURL: string;
  google_web_client_id?: string;
  google_ios_client_id?: string;
  environment?: EnvType;
};

const config: appConfig = {
  apiURL: Config.API_URL || '',
  baseURL: Config.BASE_URL || '',
  // cdnURL: Config.CDN_URL || '',
  cdnURL: 'https://tempklippd.blob.core.windows.net/klippd/',
  blobURL: Config.BLOB_URL || '',
  google_web_client_id: '',
  google_ios_client_id: '',
  environment: Config.ENVIRONMENT,
};

export const useConfig = () => {
  return config;
};

export default config;
