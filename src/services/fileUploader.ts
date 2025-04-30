import RNFetchBlob from 'react-native-blob-util';
import config from '~/config';

export const uploadFile = async (
  param: any,
  onUploadProgress: (percent: number) => void,
) => {
  const uri = param?.path;
  const mime: string = param?.mime;
  const extention = param?.path?.split?.('.')?.pop?.() || '';
  // const name: string = param?.filename ?? `image${Date.now()}${param?.path}`;
  const name: string = param?.filename ?? `image${Date.now()}.${extention}`;

  return new Promise(async (resolve, reject) => {
    try {
      const sasContainerUri = config.sasContainerUri;
      const customBlobName = Math.random().toString(16).slice(2);
      const container = 'images';
      const sasToken = config.sasToken;
      const assetPath = `${sasContainerUri}/${container}/${customBlobName}${name}`;

      const localUri = uri;
      console.log(uri);

      // Platform.OS === 'ios' ? uri.replace('file://', '/') : uri;
      const res = await RNFetchBlob.fetch(
        'PUT',
        `${assetPath}?${sasToken}`,
        {
          'x-ms-blob-type': 'BlockBlob',
          'content-type': 'application/octet-stream',
          'x-ms-blob-content-type': mime || 'image/png',
        },
        RNFetchBlob.wrap(localUri),
      )
        .uploadProgress({interval: 250}, (written, total) => {
          console.log('uploaded', written / total);
          onUploadProgress?.(Math.round((written / total) * 100));
        })
        .progress({count: 10}, (received, total) => {
          console.log('progress', received / total);
        });
      if (res.respInfo.status === 201) {
        resolve({
          ...res,
          uploadedUrl: res?.respInfo?.redirects?.[0]?.replace?.(
            '?' + sasToken,
            '',
          ),
        });
      }
    } catch (error) {
      console.log(error, 'error');

      reject(error);
    }
  });
};
