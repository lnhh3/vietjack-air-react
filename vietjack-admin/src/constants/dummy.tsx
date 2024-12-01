import { UserRole, UserStatus } from '@/types/user';

export const FAKE_STATUS_DATA = [
  { label: 'active', value: UserStatus.ACTIVE },
  { label: 'inactive', value: UserStatus.INACTIVE },
  { label: 'pending', value: UserStatus.PENDING },
];

export const ROLE_DATA = [
  { label: 'admin', value: UserRole.ADMIN },
  { label: 'user', value: UserRole.USER },
];
