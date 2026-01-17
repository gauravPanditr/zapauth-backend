import { Router } from "express";
import adminController from "../../controller/adminController";


const adminrouter = Router();

// Signup
adminrouter.post("/signup",adminController.createAdmin);

//login
adminrouter.post("/login",adminController.loginAdmin);

adminrouter.get("/me",adminController.getMe);

adminrouter.get("/:id",adminController.getById);


adminrouter.post('/refresh',adminController.refreshToken)

export default adminrouter;
