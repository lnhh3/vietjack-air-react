export type AuthDetail = {
  accessToken: string;
  expireTime: number;
};

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type UserDetail = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userStatus: string;
  systemStatus: string;
  lastIpAddress: string;
  profileImage: string;
  lastLogin: number;
  userRole: UserRole;
  firstLogin: boolean;
};

export type LoginRequest = {
  username: string;
  passwordHash: string;
  userRole: 'ADMIN' | 'USER';
};

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
};
export type TokenResponse = {
  token: string;
  expireTime: number;
};

export type SignUpConfirmRequest = {
  token: string;
  passcode: string;
};

export type GoogleLoginRequest = {
  token: string;
  userRole: 'ADMIN' | 'USER';
};
