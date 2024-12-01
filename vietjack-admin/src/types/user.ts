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

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}
