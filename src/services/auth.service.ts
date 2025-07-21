import { AppDataSource } from "@config/data-source";
import { UsersEntity } from "@entities/user.entity";
import { LoginDTO } from "src/dtos/auth/login.dto";
import { RegisterDTO } from "src/dtos/auth/register.dto";
import { UserRole } from "src/enum/roles.enum";
import { UserStatus } from "src/enum/user-status.enum";
import { hashPassword, comparePassword } from "@utils/hash";
import { generateToken } from "@utils/jwt";

const userRepo = AppDataSource.getRepository(UsersEntity);

export const register = async (data: RegisterDTO): Promise<string> => {
  const { fullName, birthDate, email, password, role } = data;

  const userRole = Object.values(UserRole).includes(role)
    ? role
    : UserRole.USER;

  const existing = await userRepo.findOne({ where: { email } });
  if (existing) {
    throw new Error("Email already registered");
  }

  const hashed = await hashPassword(password);

  const user = userRepo.create({
    fullName,
    birthDate: new Date(birthDate),
    email,
    password: hashed,
    role: userRole,
    userStatus: UserStatus.ACTIVE,
  });

  await userRepo.save(user);

  return generateToken({ id: user.id, role: user.role });
};

export const login = async (data: LoginDTO): Promise<string> => {
  const { email, password } = data;

  const user = await userRepo.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    throw new Error("Invalid email or password");
  }

  if (user.userStatus !== UserStatus.ACTIVE) {
    throw new Error("User is blocked");
  }

  return generateToken({ id: user.id, role: user.role });
};
