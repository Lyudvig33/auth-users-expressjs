import { UserRole } from "src/enum/roles.enum";

export class RegisterDTO {
  fullName: string;

  birthDate: string;

  email: string;

  password: string;

  role?: UserRole;
}
