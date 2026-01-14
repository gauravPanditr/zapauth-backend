
import { Router } from "express";
import authController from "../../controller/authController";

const router = Router();

// User signup under project
router.post("/signup", authController.createUser);

// User login under project
// router.post("/login", login);

export default router;
