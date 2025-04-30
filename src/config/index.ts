import Config from 'react-native-config';

type appConfig = {
  apiURL: string;
  baseURL: string;
  cdnURL: string;
  blobURL: string;
  google_web_client_id?: string;
  google_ios_client_id?: string;
  environment?: EnvType;
  sasContainerUri:string;
  sasToken:string
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
  sasContainerUri: 'https://klpmedia.blob.core.windows.net/klpmedia',
  sasToken: 'sp=racwdli&st=2025-04-23T08:05:44Z&se=3025-04-23T16:05:44Z&sv=2024-11-04&sr=c&sig=Pr7exezKyZa%2FSauH6CM9Th1zGGTQVt%2BW0e05rhHDxdM%3D'
};

export const useConfig = () => {
  return config;
};

export default config;
