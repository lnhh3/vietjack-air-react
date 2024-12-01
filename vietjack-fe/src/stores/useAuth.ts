import { create } from "zustand";
import { persist } from "zustand/middleware";

import { authService } from "@/service/auth";
import { SystemStatus } from "@/types/common";
import CookieHelper, { CookieKeys } from "@/utils/CookieHelper";

export type UserAuth = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  systemStatus: SystemStatus;
};

type AuthStore = {
  accessToken: string | null;
  userAuth: UserAuth | null;
  setAccessToken: (token: string | null) => void;
  setUserAuth: (UserAuth: UserAuth | null) => void;
  signOut: () => void;
  fetchUserAuth: () => Promise<UserAuth>;
};

const useAuth = create<AuthStore>()(
  persist(
    (setState) => ({
      accessToken: null,
      userAuth: null,
      setAccessToken: (token: string | null) => {
        setState({ accessToken: token });
        if (token) CookieHelper.setCookie(CookieKeys.ACCESS_TOKEN, token);
        else CookieHelper.deleteCookie(CookieKeys.ACCESS_TOKEN);
      },
      signOut: () => {
        setState({ accessToken: null, userAuth: null });
        CookieHelper.deleteCookie(CookieKeys.ACCESS_TOKEN);
      },
      setUserAuth: (UserAuth) => {
        setState({ userAuth: UserAuth });
      },
      fetchUserAuth: async () => {
        const user = await authService.getAuth();
        setState({ userAuth: user });
        return user;
      },
    }),
    {
      name: "auth-storage",
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as AuthStore),
      }),
    },
  ),
);

export default useAuth;
