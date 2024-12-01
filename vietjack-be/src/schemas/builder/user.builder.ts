import moment from 'moment';

import { User } from '@/schemas/user.schema';
import { SystemStatus } from '@/types/common';
import { UserStep } from '@/types/user';
import { UserRole } from '@/types/role';

export class UserBuilder {
  private readonly user: User;

  constructor() {
    this.user = new User();
  }

  fullName(fullName: string): this {
    this.user.fullName = fullName;
    return this;
  }

  email(email: string): this {
    this.user.email = email;
    return this;
  }

  lastIpAddress(lastIpAddress: string): this {
    this.user.lastIpAddress = lastIpAddress;
    return this;
  }

  phoneNumber(phoneNumber: string): this {
    this.user.phoneNumber = phoneNumber;
    return this;
  }

  passwordHashed(password: string): this {
    this.user.passwordHashed = password;
    return this;
  }

  passwordSalt(passwordSalt: string): this {
    this.user.passwordSalt = passwordSalt;
    return this;
  }

  userRole(role: UserRole): this {
    this.user.userRole = role;
    return this;
  }

  systemStatus(status: SystemStatus): this {
    this.user.systemStatus = status;
    return this;
  }

  build() {
    return this.user;
  }
}
