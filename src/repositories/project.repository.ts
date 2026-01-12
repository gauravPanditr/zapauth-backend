import { prisma } from "../config/dbConfig";
import { CreateProjectDTO } from "../dtos/createProjectdto";
import { UpdateProjectDTO } from "../dtos/updateProject.dto";

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
   async updateProject(dto: UpdateProjectDTO) {
    const data: any = {};

    if (dto.projectName !== undefined) {
      data.projectName = dto.projectName;
    }

    if (dto.appName !== undefined) {
      data.appName = dto.appName;
    }

    if (dto.appEmail !== undefined) {
      data.appEmail = dto.appEmail;
    }

    return prisma.project.update({
      where: { id: dto.id },
      data,
    });
  }
}


export default ProjectRespository;