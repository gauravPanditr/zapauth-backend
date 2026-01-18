import { Response, NextFunction } from "express";
import { AuthenticatedAdminRequest } from "../types/RequestWithUser";
import { verifyAccessToken } from "../utils/auth.admin.utils";
import AdminService from "../service/admin.service";
import AdminRepository from "../repositories/admin.repository";
import { JwtDecodedAdmin } from "../types/JwtDecodedUser";

const adminService = new AdminService(new AdminRepository());

export const authenticateAdmin = async (
  req: AuthenticatedAdminRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.cookies?.["admin-access-token"] ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Access token missing" });
      return;
    }

    
    let payload: JwtDecodedAdmin;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    // Fetch admin
    const admin = await adminService.getAdminById(payload.id);
    if (!admin) {
      res.status(401).json({ message: "Admin not found" });
      return;
    }

    // Attach to request
    req.admin = {
      id: admin.id,
      email: admin.email,
      username: admin.username,
    };

    next();
  } catch (err) {
    console.error("Admin auth error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
