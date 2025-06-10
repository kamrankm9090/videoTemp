import {proxy} from 'valtio';
import {LiveType} from '~/graphql/generated';

const initialState = {
  liveId: '',
  token: '',
  liveType: LiveType.LiveContent,
  tokenCreateDate: undefined as number | undefined,
  liveData: undefined,
};

const liveStore = proxy<liveStoreType>({
  ...initialState,
  setLiveId: (liveId: string) => {
    liveStore.liveId = liveId;
  },
  setToken: (token: string) => {
    liveStore.token = token;
  },
  setLiveType: (liveType: LiveTypeG) => {
    liveStore.liveType = liveType;
  },
  setTokenCreateDate: (tokenCreateDate: number) => {
    liveStore.tokenCreateDate = tokenCreateDate;
  },
  setLiveData: (liveData: LiveDto) => {
    liveStore.liveData = liveData;
  },
  resetLiveStore: () => {
    liveStore.liveId = initialState.liveId;
    liveStore.token = initialState.token;
    liveStore.liveType = initialState.liveType;
    liveStore.tokenCreateDate = initialState.tokenCreateDate;
    liveStore.liveData = initialState.liveData;
  },
});

export default liveStore;
