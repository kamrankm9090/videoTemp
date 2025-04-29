import {proxy} from 'valtio';

const liveStore = proxy<liveStoreType>({
  liveId: '',
  token: '',
  tokenCreateDate: undefined,
  setLiveId: (liveId: string) => {
    liveStore.liveId = liveId;
  },
  setToken: (token: string) => {
    liveStore.token = token;
  },
  setTokenCreateDate: (tokenCreateDate: string) => {
    liveStore.tokenCreateDate = tokenCreateDate;
  },
});

export default liveStore;
