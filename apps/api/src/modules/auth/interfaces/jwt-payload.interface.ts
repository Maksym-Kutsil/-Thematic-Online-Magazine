import { UserRole } from '../../users/entities/user-role.enum.js';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
