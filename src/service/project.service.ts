import type { Project } from "@prisma/client";
import { CreateProjectDTO } from "../dtos/createProjectdto";
import ProjectRespository from "../repositories/project.repository";
import jwt from "jsonwebtoken";

import serverConfig from "../config"
class ProjectService{
    private projectrepository:ProjectRespository;
     constructor(projectrepository:ProjectRespository){
        this.projectrepository=projectrepository;
    }

async createProject(dto: CreateProjectDTO, adminId: string): Promise<Project> {
  if (!dto.projectName || !dto.appName || !dto.appEmail) {
    throw new Error("Required fields are missing");
  }

  // Step 1: Create project first
  const project = await this.projectrepository.createProject(dto, adminId);

  // Step 2: Now generate the JWT projectKey
  const projectKey = jwt.sign(
    { projectId: project.id, ownerId: adminId },
    serverConfig.PROJECT_KEY_GENERATION_SECRET
  );

  // Step 3: Update projectKey in DB if needed
  const updatedProject = await this.projectrepository.updateProjectKey(project.id, projectKey);

  return updatedProject;
}
 

   
   async getAllProjectsByAdmin(adminId:string){
     return await this.projectrepository.getAllProjectsByAdmin(adminId);
   }

 
   async deleteProjectById(id:string){
    const deleteproject=await this.projectrepository.deleteByProjectId(id);
    return deleteproject;
   }
   
}

export default ProjectService;


