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
      userData: undefined,
      isOnboardingViewed: false,
      isUserLoggedIn: false,
      authData: undefined,
      setUserData: (userData: User) => set({userData}),
      setIsOnboardingViewed: (isOnboardingViewed: boolean) =>
        set({isOnboardingViewed}),
      setIsUserLoggedIn: (isUserLoggedIn: boolean) => set({isUserLoggedIn}),
      setToken: (token: string) => set({token}),
      setAuthData: ({
        token,
        expireDate,
        refreshToken,
        refreshTokenExpiryTime,
      }: AuthDataType) =>
        set({
          authData: {token, expireDate, refreshToken, refreshTokenExpiryTime},
        }),
    }),
    {
      name: 'userData-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
export default userDataStore;
