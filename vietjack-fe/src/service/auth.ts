import { jwtDecode } from "jwt-decode";

import HttpRequest from "@/http";
import { UserAuth } from "@/stores/useAuth";
import {
  AuthResponse,
  JwtAuthDecode,
  LoginRequest,
  SignUpRequest,
} from "@/types/auth";
import CookieHelper, { CookieKeys } from "@/utils/CookieHelper";

export const authService = {
  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    const res = await HttpRequest.post<AuthResponse>("/auth/sign-up", data);
    const decode = jwtDecode<JwtAuthDecode>(res.data.accessToken);
    decode?.exp &&
      CookieHelper.setCookie(
        CookieKeys.ACCESS_TOKEN,
        res.data.accessToken,
        new Date(decode.exp),
      );
    return res.data;
  },
  async login(data: LoginRequest): Promise<AuthResponse> {
    const res = await HttpRequest.post<AuthResponse>("/auth/login", data);
    const decode = jwtDecode<JwtAuthDecode>(res.data.accessToken);
    decode?.exp &&
      CookieHelper.setCookie(
        CookieKeys.ACCESS_TOKEN,
        res.data.accessToken,
        new Date(decode.exp),
      );
    return res.data;
  },
  async getAuth(): Promise<UserAuth> {
    const res = await HttpRequest.get<UserAuth>("/auth");
    return res.data;
  },
};
