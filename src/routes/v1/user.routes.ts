
import { Router } from "express";
import userController from "../../controller/userController";
import { authenticateUser } from "../../middleware/user-auth";

const router = Router();


router.post("/signup", userController.createUser);
router.post("/login",userController.login)
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password",  userController.resetPassword);
router.get("/me",authenticateUser,userController.getCurrentUser);
router.post('/refresh',userController.refreshToken);
router.delete('/delete',authenticateUser,userController.deleteAccount);
router.delete('/session/delete',authenticateUser,userController.deleteCurrentLogin);


export default router;
