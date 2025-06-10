import {proxy} from 'valtio';

const initialState = {
  contentData: undefined,
};

const contentStore = proxy<contentStoreType>({
  ...initialState,
  setContentData: (content: LiveDto) => {
    contentStore.contentData = content;
  },
  resetLiveStore: () => {
    contentStore.contentData = initialState.contentData;
  },
});

export default contentStore;
