import {  Response } from "express";
import UserRepository from "../repositories/user.repository";
import UserService from "../service/user.service";
import CreateUserDTO from "../dtos/createUser.dto";
import { AuthenticatedProjectRequest } from "../types/authenticatedRequest";
import { parseUserAgent } from "../utils/user-agent-parser";
import { SessionService } from "../service/session.service";
import SessionRepository from "../repositories/session.repository";
import { CreateSessionDTO } from "../dtos/sessionUser.dto";
import { AuthenticatedUserRequest } from "../types/requestwithUser";
import { StatusCodes } from "http-status-codes";


const userService = new UserService(new UserRepository());
const sessionService=new SessionService(new SessionRepository())
const createUser = async (
  req: AuthenticatedProjectRequest,
  res: Response
) => {
  const projectId = req.project?.id;

  if (!projectId) {
    return res.status(401).json({
      message: "Project not authenticated",
    });
  }

  const { email, password, username } = req.body;

  
  const dto = new CreateUserDTO(email, password, username,projectId);

  const user = await userService.createUser(dto);

return  res.status(201).json({
    message: "User created successfully",
    data: user,
  });
};
 const login =async (req: AuthenticatedProjectRequest, res: Response) => {
const projectId = req.project?.id;

  if (!projectId) {
    return res.status(401).json({
      message: "Project not authenticated",
    });
  }

  const { email, password } = req.body;
  if (!email || !password || !projectId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await userService.validateUser(email, password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const userAgentHeader = req.headers["user-agent"] || "";
  const details = parseUserAgent(userAgentHeader);

 const sessionDTO = new CreateSessionDTO({
  userId: user.id,
  projectId,
  userAgent: details.userAgent,
  deviceType: details.deviceType,
  os: details.os,
  ipAddress: req.ip || "",
  accessToken: "",              
  refreshToken: "",             
  accessTokenExpiry: new Date(),   
  refreshTokenExpiry: new Date(),   
});

  const { session, accessToken, refreshToken } =
    await sessionService.createLoginSession(sessionDTO);

  // Set cookies
  return res
    .cookie("user-access-token", accessToken, {
      httpOnly: true,
      
      maxAge: 15 * 60 * 1000,
    })
    .cookie("user-refresh-token", refreshToken, {
      httpOnly: true,
     
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({ message: "Login successful", session });
};

 const getCurrentUser=async(req:AuthenticatedUserRequest,res:Response)=>{
      const userId=req.user?.userId;
       const sessionId=req.session?.id;

        if(!userId || !sessionId){
            return res.status(401).json({ message: "Unauthorized" });
        }
       
        
       const session=await sessionService.findBySessionId(sessionId);

       const user=await userService.findById(userId);
       
     return  res.status(StatusCodes.OK).json({
         session,
         user
       })

 }
 
export const refreshToken = async (req: AuthenticatedProjectRequest, res: Response) => {
  const projectId = req.project?.id;

  if (!projectId) {
    return res.status(401).json({
      message: "Project not authenticated",
    });
  }

  const token = req.cookies["user-refresh-token"];
console.log("🔵 refresh token received:",token);
  if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const { accessToken } = await sessionService.refreshAccessToken(token);

    res.cookie("user-access-token", accessToken, {
       httpOnly: true,        
  secure: true,          
  sameSite: "none",     
  maxAge: 15 * 60 * 1000 
    
    });

    return res.status(200).json({
      message: "Access token refreshed successfully",
    });
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const deleteCurrentLogin=async(req:AuthenticatedUserRequest,res:Response)=>{
    const userId=req.user?.userId;
     const sessionId=req.session?.id;
     console.log(sessionId);
     console.log(userId);
     
      if(!userId || !sessionId){
            return res.status(401).json({ message: "Unauthorized" });
        }
        await sessionService.deleteCurrentLogin(sessionId);
          return res
  .status(200)
  .clearCookie("user-access-token", { sameSite: "none", secure: true })
  .clearCookie("user-refresh-token", { sameSite: "none", secure: true })
  .json({ message: "user login session deleted successfully" });
  }



const forgotPassword = async (
  req: AuthenticatedProjectRequest,
  res: Response
) => {
  const projectId = req.project?.id;
    if (!projectId) {
    return res.status(401).json({
      message: "Project not authenticated",
    });
  }
  const { email, baseUrl } = req.body;

  if (!email || !baseUrl) {
    return res.status(400).json({ message: "Email & baseUrl required" });
  }

  await userService.forgotPassword({ email, projectId, baseUrl });

 return  res.json({ message: "If email exists, reset link sent" });
};

const resetPassword = async (
  req: AuthenticatedProjectRequest,
  res: Response
) => {
  const projectId = req.project?.id;
    if (!projectId) {
    return res.status(401).json({
      message: "Project not authenticated",
    });
  }
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
   return   res.status(400).json({ message: "Token & password required" });
  }

  await userService.resetPassword({ token, newPassword, projectId });

 return res.json({ message: "Password reset successful" });
};



export default{
    createUser,
    login,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    refreshToken,
    deleteCurrentLogin
    
}