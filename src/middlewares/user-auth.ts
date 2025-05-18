import { Request, Response, NextFunction } from "express";
import { User } from "../model/user.model";
export const userAuth = async (
      req: Request,
      res: Response,
      next: NextFunction
)=>{
      try {
      const token = req.headers["authorization"]?.replace("Bearer ", "");
      if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await User.findOne({
            accessToken: token,
      }).select("-password");
      if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
      }
      
      next();
      } catch (error) {
      
      return res.status(500).json({ message: "Internal Server Error" });
      }
}