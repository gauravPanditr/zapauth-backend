import { Router } from "express";
import { getAdmin, createAdmin } from "../controller/admin.controller";

const router = Router();

// Note: passing the _function_ directly, not an object
router.get("/admin", getAdmin);
router.post("/admin", createAdmin);

export const adminRouter = router;
