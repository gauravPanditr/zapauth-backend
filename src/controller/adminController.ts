
// import { Request, Response } from "express";
// import { Admin } from "../model/admin.model";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "secret";
// export const signupAdmin = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if email already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const admin = new Admin({ name, email, password });
//     await admin.save();

//     return res.status(201).json({ message: "Admin created successfully", adminId: admin._id });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error", error });
//   }
// };
// export const loginAdmin = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.status(400).json({ message: "Invalid email or password" });

//     const isValid = await admin.validatePassword(password);
//     if (!isValid) return res.status(400).json({ message: "Invalid email or password" });

//     // Create JWT token
//     const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });

//     return res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error", error });
//   }
// };

