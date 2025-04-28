import RNFetchBlob from 'react-native-blob-util';

export const uploadFile = async (param: any, onUploadProgress:(percent:number) => void) => {
  const uri = param?.path;
  const mime: string = param?.mime;
  const extention = param?.path?.split?.('.')?.pop?.() || '';
  // const name: string = param?.filename ?? `image${Date.now()}${param?.path}`;
  const name: string = param?.filename ?? `image${Date.now()}.${extention}`;

  return new Promise(async (resolve, reject) => {
    try {
      const sasContainerUri =
        'https://klpmedia.blob.core.windows.net/klpmedia';
      const customBlobName = Math.random().toString(16).slice(2);
      const container = 'images';
      const sasToken =
        'sp=racwdli&st=2025-04-23T08:05:44Z&se=3025-04-23T16:05:44Z&sv=2024-11-04&sr=c&sig=Pr7exezKyZa%2FSauH6CM9Th1zGGTQVt%2BW0e05rhHDxdM%3D'; // you may need to play with other html verbs in this string e.g., `sp`, `ss` e.t.c.
      const assetPath = `${sasContainerUri}/${container}/${customBlobName}${name}`;

      const localUri = uri
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
          onUploadProgress?.(Math.round(written / total * 100))
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
