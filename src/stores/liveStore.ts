import {proxy} from 'valtio';
import {LiveType} from '~/graphql/generated';

const liveStore = proxy<liveStoreType>({
  liveId: '',
  token: '',
  liveType: LiveType.LiveContent,
  tokenCreateDate: undefined,
  liveData: {},
  setLiveId: (liveId: string) => {
    liveStore.liveId = liveId;
  },
  setToken: (token: string) => {
    liveStore.token = token;
  },
  setLiveType: (liveType: LiveType) => {
    liveStore.liveType = liveType;
  },
  setTokenCreateDate: (tokenCreateDate: number) => {
    liveStore.tokenCreateDate = tokenCreateDate;
  },
  setLiveData: (liveData: any) => {
    liveStore.liveData = liveData;
  },
});

export default liveStore;
