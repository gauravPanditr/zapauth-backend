
import { Router } from "express";
import { signup, login } from "../controller/authController";

const router = Router();

// User signup under project
router.post("/signup", signup);

// User login under project
router.post("/login", login);

export default router;
