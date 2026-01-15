
import { Router } from "express";
import userController from "../../controller/userController";

const router = Router();

// User signup under project
router.post("/signup", userController.createUser);

// User login under project
// router.post("/login", login);

export default router;
