import { Router } from "express";
import { registerUser, loginUser } from "@controllers/auth.controller";
import { validate } from "@middleware/validate.middleware";
import { loginSchema, registerSchema } from "@validators/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

export const authRouter = router;
