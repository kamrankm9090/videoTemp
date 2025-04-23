import {proxy} from 'valtio';

const liveStore = proxy<liveStoreType>({
  liveId: '',
  setLiveId: (liveId: string) => {
    liveStore.liveId = liveId;
  },
});

export default liveStore;
