import { UserRole } from "../../features/auth/user.model.ts";

export interface TokenPayload {
  userId: string;
  role: UserRole;
  email: string;
}