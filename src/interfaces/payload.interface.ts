import { UserRole } from "src/enum/roles.enum";

export interface ITokenPayload {
  id: string;
  role: UserRole;
}
