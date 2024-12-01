import { AuthResponse } from '@/modules/auth/responses/auth.response';

export class AuthResponseBuilder {
  private readonly auth: AuthResponse;

  constructor() {
    this.auth = new AuthResponse();
  }

  accessToken(token: string): this {
    this.auth.accessToken = token;
    return this;
  }

  build() {
    return this.auth;
  }
}
