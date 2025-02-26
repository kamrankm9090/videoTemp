import Config from 'react-native-config';

type appConfig = {
  apiURL?: string;
  baseURL?: string;
  cdnURL?: string;
  blobURL?: string;
  google_web_client_id?: string;
  google_ios_client_id?: string;
  environment?: EnvType;
};

const config: appConfig = {
  apiURL: Config.API_URL,
  baseURL: Config.BASE_URL,
  cdnURL: Config.CDN_URL,
  blobURL: Config.BLOB_URL,
  environment: Config.ENVIRONMENT,
  google_web_client_id: '',
  google_ios_client_id: '',
};

export default config;
