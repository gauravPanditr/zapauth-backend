import { Router } from "express";
import adminController from "../../controller/adminController";
import { authenticateAdmin } from "../../middleware/admin.auth";


const adminrouter = Router();


adminrouter.post("/signup",adminController.createAdmin);


adminrouter.post("/login",adminController.loginAdmin);

adminrouter.get("/me",authenticateAdmin,adminController.getMe);

adminrouter.get("/:id",adminController.getById);
adminrouter.delete("/delete",authenticateAdmin,adminController.deleteAccount);
adminrouter.post('/logout',authenticateAdmin,adminController.deleteLoginSession);
adminrouter.post('/refresh',adminController.refreshToken)

export default adminrouter;
