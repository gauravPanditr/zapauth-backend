import { Router } from "express";
import projectController from "../../controller/projectController";
import { validateProject } from "../../middleware/validate-project";

const projectRouter = Router();


projectRouter.post("/create", projectController.createProject);
//projectRouter.put("/update",projectController.updateProject);
projectRouter.delete('/:id',projectController.deleteProjectById);
projectRouter.get('/:id/projects',projectController.getAllProjectsByAdmin);
projectRouter.put('/generate-new-key',validateProject,projectController.createNewProjectKey);
projectRouter.put('/update-appName',validateProject,projectController.updateAppName);
export default projectRouter;
