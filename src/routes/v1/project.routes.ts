import { Router } from "express";
import projectController from "../../controller/projectController";

const projectRouter = Router();

// Create project
projectRouter.post("/create", projectController.createProject);



export default projectRouter;
