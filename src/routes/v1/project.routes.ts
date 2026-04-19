import { Router } from "express";
import projectController from "../../controller/projectController";
import { validateProject } from "../../middleware/validate-project";

const projectRouter = Router();


projectRouter.post("/create", projectController.createProject);
projectRouter.patch("/update",validateProject,projectController.updateProject);
projectRouter.delete('/delete/:projectId',projectController.deleteProjectById);
projectRouter.get('/projects',projectController.getAllProjectsByAdmin);
projectRouter.get('/:id/projects',projectController.getAllProjectsByAdmin);
projectRouter.get('/:id',projectController.getProjectById);
projectRouter.put('/generate-new-key',validateProject,projectController.createNewProjectKey);
//projectRouter.put('/update-appName',validateProject,projectController.updateAppName);
projectRouter.delete('/delete/all',projectController.deleteAllProject);
export default projectRouter;
