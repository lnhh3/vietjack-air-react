import { ApiProperty } from '@nestjs/swagger';

import { AuthResponseBuilder } from '@/modules/auth/responses/builder/auth-response.builder';
import { UserStep } from '@/types/user';

export class AuthResponse {
  @ApiProperty()
  accessToken?: string;

  static builder() {
    return new AuthResponseBuilder();
  }
}
