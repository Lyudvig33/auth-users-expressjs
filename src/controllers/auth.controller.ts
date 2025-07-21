import { Request, Response } from "express";
import * as authService from "src/services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const token = await authService.register(req.body);
    res.status(201).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(req.body);
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
