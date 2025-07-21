import { Router } from "express";
import {
  getUserById,
  getAllUsers,
  blockUser,
} from "@controllers/user.controller";
import { authMiddleware } from "@middleware/auth-middleware";
import { roleMiddleware } from "@middleware/role-middleware";
import { UserRole } from "src/enum/roles.enum";
const router = Router();

router.use(authMiddleware);

router.get("/:id", getUserById);
router.get("/", roleMiddleware([UserRole.ADMIN]), getAllUsers);
router.patch("/:id/block", blockUser);

export const userRouter = router;
