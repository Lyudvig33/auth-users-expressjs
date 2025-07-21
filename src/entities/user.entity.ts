import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserRole } from "src/enum/roles.enum";
import { UserStatus } from "src/enum/user-status.enum";
import { Exclude } from "class-transformer";

@Entity({ name: "users" })
export class UsersEntity extends BaseEntity {
  @Column({ name: "full_name" })
  fullName: string;

  @Column({ name: "date_of_birth", type: "date" })
  birthDate: Date;

  @Column({ name: "email", unique: true })
  email: string;

  @Column({ name: "password" })
  @Exclude()
  password: string;

  @Column({
    name: "role",
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    name: "user_status",
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  userStatus: UserStatus;
}
