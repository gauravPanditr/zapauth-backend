import { Router } from "express";
import projectController from "../../controller/projectController";

const projectRouter = Router();


projectRouter.post("/create", projectController.createProject);
projectRouter.put("/update",projectController.updateProject);
projectRouter.delete('/:id',projectController.deleteProjectById);
projectRouter.get('/:id/projects',projectController.getAllProjectsByAdmin);

export default projectRouter;
