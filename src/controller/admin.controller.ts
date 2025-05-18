import { Request, Response } from "express";

export const createAdmin = {
  async getAdmin(req:Request, res:Response) {
    try {
      const admin = req.body;
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.status(200).json(admin);
    }
    catch (error) {
      console.error("Error in getAdmin:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
}
export const getAdmin = {
  async getAdmin(req:Request, res:Response) {
    try {
      const admin = req.body;
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.status(200).json(admin);
    }
    catch (error) {
      console.error("Error in getAdmin:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
}