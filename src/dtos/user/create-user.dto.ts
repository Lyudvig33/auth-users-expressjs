import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
} from "class-validator";
import { UserRole } from "src/enum/roles.enum";
import { UserStatus } from "src/enum/user-status.enum";

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsDateString()
  birthDate!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @IsEnum(UserStatus)
  userStatus!: UserStatus;
}
