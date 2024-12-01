import { ApiProperty } from '@nestjs/swagger';

import { UserDocument } from '@/schemas/user.schema';
import { SystemStatus } from '@/types/common';
import { UserRole } from '@/types/role';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  userRole: UserRole;

  @ApiProperty()
  systemStatus: SystemStatus;

  constructor(user: UserDocument) {
    this.id = user.id;
    this.fullName = user.fullName;
    this.email = user.email;
    this.systemStatus = user.systemStatus;
    this.userRole = user.userRole;
    this.phoneNumber = user.phoneNumber;
  }
}
