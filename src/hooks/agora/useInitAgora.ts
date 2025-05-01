import {useEffect} from 'react';
import {useAgora_GetAppIdQuery} from '~/graphql/generated';
import {agoraStore} from '~/stores';

const useInitAgora = () => {
  const {data: agoraData, isLoading} = useAgora_GetAppIdQuery({});

  const {setAppId} = agoraStore(state => state);

  useEffect(() => {
    if (agoraData?.agora_getAppId?.status?.code === 1) {
      setAppId(agoraData?.agora_getAppId?.result);
    }
  }, [agoraData]);

  return {isLoading};
};

export default useInitAgora;
