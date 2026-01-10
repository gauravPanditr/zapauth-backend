import { Request, Response } from "express";
import AdminRepository from "../repositories/admin.repository";
import AdminService from "../service/admin.service";

const adminService = new AdminService(new AdminRepository());

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const response = await adminService.createAdmin(req.body);
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export default {
    createAdmin,
}
