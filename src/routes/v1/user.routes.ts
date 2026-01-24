
import { Router } from "express";
import userController from "../../controller/userController";
import { authenticateUser } from "../../middleware/user-auth";

const router = Router();

// User signup under project
router.post("/signup", userController.createUser);
router.post("/login",userController.login)
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password",  userController.resetPassword);
router.get("/me",authenticateUser,userController.getCurrentUser);
router.post('/refresh',userController.refreshToken)
// User login under project
// router.post("/login", login);

export default router;
