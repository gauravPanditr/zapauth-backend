import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AdminModel } from "../model/admin.model";
import { IRequest } from "../types/api.types";

export const authenticateAdmin = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken =
      req.headers.authorization?.replace("Bearer ", "") ||
      req.cookies["admin-access-token"];

    if (!accessToken) {
      return res.status(401).json({ message: "Access token not provided" });
    }

    const decodedToken = jwt.decode(accessToken) as { adminId: string } | null;

    if (!decodedToken?.adminId) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    const adminFromDB = await AdminModel.findById(decodedToken.adminId).select(
      "-password -refreshToken"
    );

    if (!adminFromDB) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (adminFromDB.accessTokenExpiry < new Date()) {
      return res.status(401).json({ message: "Access token expired" });
    }

    req.admin = { id: adminFromDB._id };

    next();
  } catch (error) {
    console.error("Error in authenticateAdmin:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
