import jwt from "jsonwebtoken";
import { Request } from "express";
import { ITokenPayload } from "src/interfaces/payload.interface";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error("JWT_SECRET is not defined");


export const generateToken = (payload: ITokenPayload): string => {
  return jwt.sign(payload, jwtSecret, { expiresIn: "24h" });
};

export const verifyToken = (token: string): ITokenPayload => {
  return jwt.verify(token, jwtSecret) as ITokenPayload;
};

export const getUserFromToken = (token: string): ITokenPayload | null => {
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
};

export const getUserFromRequest = (req: Request): ITokenPayload | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  return getUserFromToken(token);
};
