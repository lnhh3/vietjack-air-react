export type SignUpRequest = {
  fullName: string;
  password: string;
  phoneNumber: string;
  email: string;
};

export type AuthResponse = {
  accessToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type JwtAuthDecode = {
  email: string;
  fullName: string;
  iat: number;
  exp: number;
};
