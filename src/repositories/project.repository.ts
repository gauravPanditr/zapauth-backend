import { prisma } from "../config/dbConfig";
import { CreateProjectDTO } from "../dtos/createProjectdto";


class ProjectRespository{
  async createProject(dto : CreateProjectDTO){
     const project = await prisma.project.create({
        data: {
            projectName: dto.projectName,
            appName: dto.appName,
            appEmail: dto.appEmail,
            projectKey: dto.projectKey,
            owner: {
                connect: { id: dto.owner }
            },
        }
     })
     return project;
  }
  
}


export default ProjectRespository;