import { UserRole } from "../../features/auth/user.model.ts";

export interface tokenPayload {
  userId: string;
  role: UserRole;
  email: string;
}