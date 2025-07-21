import { Request, Response } from "express";
import * as userService from "src/services/user.service";
import { getUserFromRequest } from "@utils/jwt";
import { validate as isUuid } from "uuid";
import { ITokenPayload } from "src/interfaces/payload.interface";
import { instanceToPlain } from "class-transformer";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requester = getUserFromRequest(req) as ITokenPayload;

    if (!isUuid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (requester.id !== id && requester.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await userService.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(instanceToPlain(user));
  } catch (error) {
    console.error("getUserById error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const requester = getUserFromRequest(req) as ITokenPayload;

    if (requester.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await userService.findAllusers();
    res.json(instanceToPlain(users));
  } catch (error) {
    console.error("getAllUsers error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const blockUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requester = getUserFromRequest(req) as ITokenPayload;

    if (!isUuid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (requester.id !== id && requester.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const result = await userService.blockUser(id);
    res.json({ message: "User blocked", user: result });
  } catch (error) {
    console.error("blockUser error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
