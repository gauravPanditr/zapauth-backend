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
 

async updateProjectKey(projectId: string){
  const project = await this.projectrepository.getProjectById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  const newProjectKey = jwt.sign(
    { projectId: project.id },
    serverConfig.PROJECT_KEY_GENERATION_SECRET
  );

  return this.projectrepository.updateProjectKey(
    project.id,
    newProjectKey
  );
}
async updateProjectAppName(projectId: string, newAppName: string) {
  const project = await this.projectrepository.getProjectById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  // Update appName in the repository
  return await this.projectrepository.updateAppName(projectId, newAppName);
}

 

   
   async getAllProjectsByAdmin(adminId:string){
     return await this.projectrepository.getAllProjectsByAdmin(adminId);
   }
   async getProjectById(projectId:string){
     return await this.projectrepository.getProjectById(projectId);
   }
 
   async deleteProjectById(id:string){
    const deleteproject=await this.projectrepository.deleteProjectById(id);
    return deleteproject;
   }
   
}

export default ProjectService;


