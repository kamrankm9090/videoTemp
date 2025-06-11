import {proxy} from 'valtio';

const initialState = {
  isMuted: undefined,
};

const homePostStore = proxy<homePostStoreType>({
  ...initialState,
  setIsMuted: (isMute: boolean) => {
    homePostStore.isMuted = isMute;
  },
  resetHomePostStore: () => {
    homePostStore.isMuted = initialState.isMuted;
  },
});

export default homePostStore;
