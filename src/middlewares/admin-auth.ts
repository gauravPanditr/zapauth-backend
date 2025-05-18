import { Request, Response, NextFunction } from "express";
import { AdminModel } from "../model/admin.model";



export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const admin = await AdminModel.findOne({
      accessToken: token,
    }).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
     
    next();
  } catch (error) {
   
    return res.status(500).json({ message: "Internal Server Error" });
  }
  
}