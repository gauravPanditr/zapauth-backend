import { Router } from "express";
import adminController from "../../controller/adminController";


const adminrouter = Router();

// Signup
adminrouter.post("/signup",adminController.createAdmin);




export default adminrouter;
