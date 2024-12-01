import { create } from 'zustand';

type UseAuthConfigStore = {
  themeMode: 'dark' | 'light';
  userRole: 'ADMIN' | 'USER';
  canRegister?: boolean;
  language?: 'vi' | 'en';
  onSuccess?: (data?: any) => void;
  onError?: (e: any) => void;
};

type Action = {
  setAuthConfig: (data: UseAuthConfigStore) => void;
};

const useAuthConfig = create<UseAuthConfigStore & Action>((set, get) => ({
  themeMode: 'light',
  userRole: 'USER',
  canRegister: true,
  language: 'en',

  setAuthConfig(data) {
    set({
      ...get(),
      ...data,
    });
  },
}));

export default useAuthConfig;
