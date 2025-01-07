import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import {zustandStorage} from '~/services/storage';

type UserDataPersist = (
  config: StateCreator<UserDataStoreType>,
  options: PersistOptions<UserDataStoreType>,
) => StateCreator<UserDataStoreType>;
const userDataStore = create<UserDataStoreType>(
  (persist as UserDataPersist)(
    set => ({
      userData: {},
      isOnboardingViewed: false,
      setUserData: (userData: User) => set({userData}),
      setIsOnboardingViewed: (isOnboardingViewed: boolean) =>
        set({isOnboardingViewed}),
    }),
    {
      name: 'userData-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
export default userDataStore;
