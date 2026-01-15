import { Request, Response } from "express";
import AuthService from "../service/user.auth.service";
import UserService from "../service/user.service";
import SessionService from "../service/session.service";
import UserRepository from "../repositories/user.repository";
import SessionRepository from "../repositories/session.repository";
import { DeviceType } from "../types/device";

const authService = new AuthService(
  new UserService(new UserRepository()),
  new SessionService(new SessionRepository())
);

 const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const projectId = req.headers["x-project-id"] as string;
    if (!projectId) {
      return res.status(400).json({ message: "Project ID missing" });
    }
   
    
    const result = await authService.login(
      email,
      password,
      projectId,
      {
        userAgent: req.headers["user-agent"] || "unknown",
        os: req.headers["sec-ch-ua-platform"]?.toString() || "unknown",
        ip: req.ip || "0.0.0.0",
        deviceType: DeviceType.desktop,
      }
    );
  
    
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
};
export default{
  login
}