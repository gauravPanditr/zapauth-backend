import { NextFunction, Response } from "express";
import { AuthenticatedProjectRequest } from "../types/authenticatedRequest";
import ProjectService from "../service/project.service";
import ProjectRespository from "../repositories/project.repository";
import { decodeProjectKey } from "../utils/project.utils";


const projectService=new ProjectService(new ProjectRespository());
export const validateProject=async(req:AuthenticatedProjectRequest,res: Response,
  next: NextFunction)=>{
 if (req.path.includes("/admin/")) {
      return next();
    }

    const projectId = req.headers["project-id"] as string;
    const projectKey = req.headers["project-key"] as string;
     if (!projectId || !projectKey) {
      return res.status(401).json({
        message: "Project credentials missing",
      });
    } 
    
    
        const project=await projectService.getProjectById(projectId);
         if (!project) {
      throw new Error("Project not found");
    }
  if (project.projectKey !== projectKey) {
      throw new Error("Project key mismatch");
    }
        const decoded = decodeProjectKey(projectKey);
    if (!decoded?.projectId) {
      throw new Error("Invalid project key");
    }

    // Ensure key belongs to project
    if (decoded.projectId !== project.id) {
      throw new Error("Project key does not belong to this project");
    }

  req.project = {
  id: project.id,
  key: projectKey,
};
   next();
  }