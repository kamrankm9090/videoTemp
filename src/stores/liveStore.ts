import {proxy} from 'valtio';

const liveStore = proxy<liveStoreType>({
  liveId: '',
  token: '',
  tokenCreateDate: undefined,
  liveData: {},
  setLiveId: (liveId: string) => {
    liveStore.liveId = liveId;
  },
  setToken: (token: string) => {
    liveStore.token = token;
  },
  setTokenCreateDate: (tokenCreateDate: number) => {
    liveStore.tokenCreateDate = tokenCreateDate;
  },
  setLiveData: (liveData: any) => {
    liveStore.liveData = liveData;
  },
});

export default liveStore;
