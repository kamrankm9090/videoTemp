import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import {zustandStorage} from '~/services/storage';

type AgoraStorePersist = (
  config: StateCreator<AgoraStoreType>,
  options: PersistOptions<AgoraStoreType>,
) => StateCreator<AgoraStoreType>;
const agoraStore = create<AgoraStoreType>(
  (persist as AgoraStorePersist)(
    set => ({
      appId: '',
      token: '',
      tokenCreatedDate: undefined,
      channelName: 'test449',
      setAppId: (appId: string) => set({appId}),
      setToken: (token: string) => set({token}),
      setTokenCreatedDate: (tokenCreatedDate: number) =>
        set({tokenCreatedDate}),
      setChannelName: (channelName: string) => set({channelName}),
    }),
    {
      name: 'agora-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
export default agoraStore;
