import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  birthDate: Joi.date().iso().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "user").default("user"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
