import httpRequest from '@/http/Axios';
import {
  AuthDetail,
  GoogleLoginRequest,
  LoginRequest,
  SignUpConfirmRequest,
  SignUpRequest,
  TokenResponse,
  UserDetail,
} from '@/types/auth';
import StorageHelper from '@/utils/StorageHelper';

const login = async (data: LoginRequest) => {
  const response = await httpRequest.post<LoginRequest, AuthDetail>('/auth/login', data);
  StorageHelper.setAuthToken(response.data);
  return response.data;
};

const signUpStepOne = async (data: SignUpRequest) => {
  const res = await httpRequest.post<SignUpRequest, TokenResponse>('/auth/signup-verify', data);
  return res.data;
};

const signUpFinal = async (data: SignUpConfirmRequest) => {
  const res = await httpRequest.post<SignUpConfirmRequest, AuthDetail>('/auth/sign-up', data);
  StorageHelper.setAuthToken(res.data);
  return res.data;
};

const fetchCurrentUser = async () => {
  const res = await httpRequest.get<UserDetail>('/auth/auth-info');
  return res.data;
};

const logout = async () => {
  const res = await httpRequest.delete('/auth/logout');
  return res.data;
};

const googleLogin = async ({ token, userRole }: GoogleLoginRequest) => {
  const res = await httpRequest.post<any, AuthDetail>('/auth/google', { token, userRole });
  return res.data;
};

const AuthAPI = {
  login,
  signUpStepOne,
  signUpFinal,
  fetchCurrentUser,
  logout,
  googleLogin,
};

export default AuthAPI;
