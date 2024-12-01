declare module '@authRemote/entry' {
  import { type RouteObject } from 'react-router-dom';

  type AuthDetail = {
    accessToken: string;
    expireTime: number;
  };

  enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }

  enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
  }

  type UserDetail = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    userStatus: UserStatus;
    systemStatus: string;
    lastIpAddress: string;
    profileImage: string;
    lastLogin: number;
    userRole: UserRole;
    firstLogin: boolean;
  };

  type AuthState = {
    authDetail: AuthDetail | null;
    userDetail: UserDetail | null;
    isLoading: boolean;
  };

  type AuthActions = {
    setAuthDetail: (auth: AuthDetail | null) => void;
    setUserDetail: (user: UserDetail | null) => void;
    fetchCurrentUser: () => Promise<UserDetail | null>;
    logout: () => Promise<void>;
  };

  type AuthStore = AuthState & AuthActions;

  type UseAuthStore = (() => AuthStore) & {
    getState(): AuthStore;
    setState(store: Partial<AuthStore>): void;
  };
  export const useAuthStore: UseAuthStore;

  const authRouter: RouteObject[];
  export const authRemoteId: string;
  export const prefix: string;

  type AuthConfig = {
    themeMode?: 'dark' | 'light';
    userRole?: 'ADMIN' | 'USER';
    canRegister?: boolean;
    language?: 'vi' | 'en';
    onSuccess?: (data?: any) => void;
    onError?: (e: any) => void;
  };
  type UseAuthRemoteConfig = (data: AuthConfig) => void;
  export const useAuthRemoteConfig: UseAuthRemoteConfig;
}
