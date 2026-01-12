import { Project } from "../../generated/prisma/client";
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

    // Optional: email validation
    if (!dto.appEmail.includes("@")) {
      throw new Error("Invalid app email");
    }

    // Call repository
    const project = await this.projectrepository.createProject(dto);

    return project;
   } 
   async updateProject(dto:UpdateProjectDTO){
       const updateproject=await this.projectrepository.updateProject(dto);
       return updateproject;
   }
}

export default ProjectService;


