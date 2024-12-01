import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import AuthAPI from '@/apis/AuthApi';
import StorageHelper from '@/utils/StorageHelper';

import { AuthDetail, UserDetail } from '../types/auth';

type AuthState = {
  authDetail: AuthDetail | null;
  userDetail: UserDetail | null;
  isLoading: boolean;
};

type AuthAction = {
  setAuthDetail: (auth: AuthDetail | null) => void;
  setUserDetail: (user: UserDetail | null) => void;
  fetchCurrentUser: () => Promise<UserDetail | null>;
  logout: () => Promise<void>;
};

const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      authDetail: null,
      userDetail: null,
      isLoading: false,
      setAuthDetail(auth) {
        set({ authDetail: auth });
        auth && StorageHelper.setAuthToken(auth);
      },
      setUserDetail(user) {
        set({ userDetail: user });
      },
      fetchCurrentUser: async () => {
        try {
          if (!StorageHelper.getAuthToken()?.accessToken) return null;
          set({ isLoading: true });
          const data = await AuthAPI.fetchCurrentUser();
          set({ userDetail: data, isLoading: false });
          return data;
        } catch (error) {
          console.log(`fetchCurrentUser: ~ error:`, error);
        }
        return null;
      },
      logout: async () => {
        try {
          set({
            userDetail: null,
            authDetail: null,
          });
          await AuthAPI.logout();
          StorageHelper.deleteAuthToken();
        } catch (error) {
          console.error(`logout: ~ error:`, error);
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
