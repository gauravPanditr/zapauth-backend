import { Request, Response } from "express";
import AdminRepository from "../repositories/admin.repository";
import AdminService from "../service/admin.service";
import GenericError from "../errors/genericError";
import { StatusCodes } from "http-status-codes";
import { unknownErrorResponse } from "../utils/response.utils";

const adminService = new AdminService(new AdminRepository());

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const response = await adminService.createAdmin(req.body);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const loginAdmin = async (req: Request, res: Response) => {
    try {
        const response = await adminService.loginAdmin(req.body);
        return res.status(201).json({
            message: 'Successfully logged in the admin',
            data: response,
            err: {},
            success: true
        })
    } catch(error: any) {
        if(error instanceof GenericError) {
            return res.status(error.statusCode).json({
                message: 'Something went wrong',
                data: {},
                err: error,
                success: true
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unknownErrorResponse);
    }
}
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

export default {
    createAdmin,
    loginAdmin,
    getById
}
