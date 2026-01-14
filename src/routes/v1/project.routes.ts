import { Router } from "express";
import projectController from "../../controller/projectController";

const projectRouter = Router();

// Create project
projectRouter.post("/create", projectController.createProject);
projectRouter.put("/update",projectController.updateProject);
projectRouter.delete('/:id',projectController.deleteProjectById);


export default projectRouter;
