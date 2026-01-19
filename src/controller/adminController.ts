import { Request, Response } from "express";
import AdminRepository from "../repositories/admin.repository";
import AdminService from "../service/admin.service";
import GenericError from "../errors/genericError";
import { StatusCodes } from "http-status-codes";
import { unknownErrorResponse } from "../utils/response.utils";

import { AuthenticatedAdminRequest } from "../types/RequestWithUser";

const adminService = new AdminService(new AdminRepository());

const createAdmin = async (req: Request, res: Response) => {
  try {
    const response = await adminService.createAdmin(req.body);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
 const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } =
      await adminService.loginAdmin(req.body);

   
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

  
    return res.status(StatusCodes.OK).json({
      message: "Successfully logged in the admin",
      data: {
        accessToken,
      },
      err: {},
      success: true,
    });
  } catch (error: any) {
    if (error instanceof GenericError) {
      return res.status(error.statusCode).json({
        message: error.message,
        data: {},
        err: error,
        success: false,
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
      data: {},
      err: error,
      success: false,
    });
  }
};
const getMe = async (req:AuthenticatedAdminRequest, res: Response) => {
      try {
        const adminId = req.admin?.id;
        if (!adminId) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Admin ID is required',
                data: {},
                err: {},
                success: false
            });
        }
        const response = await adminService.getAdminById(adminId);
        
        return res.json(response);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unknownErrorResponse);
    }
    
   
};

const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Admin ID is required',
                data: {},
                err: {},
                success: false
            });
        }
        const response = await adminService.getAdminById(id);
        
        return res.json(response);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unknownErrorResponse);
    }
}
  const refreshToken = async (req: Request, res: Response) => {
  
  const token =
      req.headers.authorization?.replace("Bearer ", "") || req.cookies["admin-refresh-token"];

  if (!token) {
   res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    // Call service method to generate only new access token
    const { accessToken } = await adminService.refreshAccessToken(token);

    // Store access token in a secure HttpOnly cookie
    res.cookie("admin-access-token", accessToken, {
      httpOnly: true,                   
      sameSite: "lax",                 
maxAge: 15 * 60 * 1000,          
    });

   
    res.status(200).json({ message: "Access token refreshed successfully" });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
const deleteLoginSession = 
  async (req: AuthenticatedAdminRequest, res: Response) => {
    const adminId = req.admin?.id;

    if (!adminId) {
    return   res.status(401).json({ message: "Unauthorized" });
    } 

  
    await adminService.deleteLoginSession(adminId);

   return  res
      .status(200)
      .clearCookie("admin-access-token")
      .clearCookie("admin-refresh-token")
      .json({
        message: "Admin login session deleted successfully",
      });
  }

export default {
    createAdmin,
    loginAdmin,
    getById,
    refreshToken,
    getMe,
    deleteLoginSession
}
