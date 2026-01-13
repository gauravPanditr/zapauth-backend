import { Project } from "@prisma/client";
import { CreateProjectDTO } from "../dtos/createProjectdto";
import { UpdateProjectDTO } from "../dtos/updateProject.dto";
import ProjectRespository from "../repositories/project.repository";

class ProjectService{
    private projectrepository:ProjectRespository;
     constructor(projectrepository:ProjectRespository){
        this.projectrepository=projectrepository;
    }

   async createProject(dto:CreateProjectDTO):Promise<Project|null>{
     if (!dto.projectName || !dto.appName || !dto.appEmail) {
      throw new Error("Required fields are missing");
    }

  
    if (!dto.appEmail.includes("@")) {
      throw new Error("Invalid app email");
    }

   
    const project = await this.projectrepository.createProject(dto);

    return project;
   } 
   async updateProject(dto:UpdateProjectDTO){
       const updateproject=await this.projectrepository.updateProject(dto);
       return updateproject;
   }
   async deleteProjectById(id:string){
    const deleteproject=await this.projectrepository.deleteByProjectId(id);
    return deleteproject;
   }
   
}

export default ProjectService;


