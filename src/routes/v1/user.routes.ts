
import { Router } from "express";
import userController from "../../controller/userController";

const router = Router();

// User signup under project
router.post("/signup", userController.createUser);
router.post("/login",userController.login)
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password",  userController.resetPassword);
// User login under project
// router.post("/login", login);

export default router;
