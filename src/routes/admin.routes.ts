import { Router } from "express";
import { signupAdmin, loginAdmin } from "../controller/adminController";

const router = Router();

// Signup
router.post("/signup", signupAdmin);

// Login
router.post("/login", loginAdmin);

export default router;
