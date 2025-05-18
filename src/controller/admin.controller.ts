import { Request, Response } from "express";

export async function getAdmin(req: Request, res: Response): Promise<void> {
  try {
    const admin = req.body;
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }
    res.status(200).json(admin);
  } catch (err) {
    console.error("Error in getAdmin:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createAdmin(req: Request, res: Response): Promise<void> {
  try {
    const newAdmin = req.body;
    res.status(201).json({ message: "Admin created", admin: newAdmin });
  } catch (err) {
    console.error("Error in createAdmin:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
