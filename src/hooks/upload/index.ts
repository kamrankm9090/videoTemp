import {useMutation} from '@tanstack/react-query';
import {useRef} from 'react';
import {uploadFile} from '~/services/fileUploader';

export const useUploadFile = () => {
  const controllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation(
    async ({
      param,
      changeProgress,
    }: {
      param: any;
      changeProgress?: (percent: number) => void;
    }) => {
      controllerRef.current = new AbortController();
      return uploadFile(param, changeProgress);
    },
    {
      onSettled: () => {
        controllerRef.current = null;
      },
    },
  );

  const reset = () => {
    controllerRef.current?.abort();
  };

  return {
    ...mutation,
    reset,
  };
};
