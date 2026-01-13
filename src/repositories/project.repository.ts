import { Project } from "../../generated/prisma/client";
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


    return prisma.project.update({
      where: { id: dto.id },
      data,
    });
  }
  async deleteByProjectId(id:string){
    return prisma.project.delete({
      where:{id}
    });


  }
  

async getAllProjectsByAdmin(adminId: string): Promise<Project[]> {
  return prisma.project.findMany({
    where: { ownerId: adminId }, 
    orderBy: { createdAt: 'desc' } 
  });
}
}


export default ProjectRespository;