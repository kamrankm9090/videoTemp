import {createThumbnail} from 'react-native-create-thumbnail';
import {useState, useEffect} from 'react';

export function useGetThumbnailVideo(url: string) {
  const [isLoading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    createThumbnailVideo(url)
      .then(res => {
        if (res) {
          setImageUrl(res);
        } else {
          setImageUrl('');
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return {isLoading, imageUrl, error};
}

const createThumbnailVideo = async (url: string) => {
  return createThumbnail({
    url: url,
    timeStamp: 1000,
  })
    .then((response: any) => {
      return response?.path;
    })
    .catch(() => {}); //TODO clear
};
