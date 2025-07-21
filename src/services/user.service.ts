import { AppDataSource } from "@config/data-source";
import { UsersEntity } from "@entities/user.entity";
import { CreateUserDTO } from "src/dtos/user/create-user.dto";
import { UserStatus } from "src/enum/user-status.enum";

const userRepo = AppDataSource.getRepository(UsersEntity);

export const findUserEmail = async (email: string) => {
  return userRepo.findOne({ where: { email } });
};

export const findUserById = async (id: string) => {
  return userRepo.findOne({ where: { id } });
};

export const createUser = async (userDto: CreateUserDTO) => {
  const userData = {
    ...userDto,
    birthDate: new Date(userDto.birthDate),
  };

  const user = userRepo.create(userData);
  return userRepo.save(user);
};

export const findAllusers = async () => {
  return await userRepo.find();
};

export const userExists = async (id: string): Promise<boolean> => {
  const count = await userRepo.count({ where: { id } });
  return count > 0;
};

export const blockUser = async (id: string): Promise<void> => {
  await userRepo.update(id, { userStatus: UserStatus.BLOCKED });
};

export const isUserBlocked = async (id: string): Promise<boolean> => {
  const user = await findUserById(id);
  return user?.userStatus === UserStatus.BLOCKED;
};

export const canAccessUser = (
  currentUserId: string,
  targetUserId: string,
  role: string
): boolean => {
  return role === "ADMIN" || currentUserId === targetUserId;
};
