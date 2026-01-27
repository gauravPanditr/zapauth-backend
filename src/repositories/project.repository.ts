import type { Project } from "@prisma/client";
import { prisma } from "../config/dbConfig";
import { CreateProjectDTO } from "../dtos/createProjectdto";

class ProjectRespository{
  async createProject(dto: CreateProjectDTO, adminId: string) {
    const project = await prisma.project.create({
      data: {
        projectName: dto.projectName,
        appName: dto.appName,
        appEmail: dto.appEmail,
        ownerId: adminId, 
        projectKey: `temp-${Math.random()}`, 
      },
    });

    return project;
  }



  async updateProjectKey(id: string, projectKey: string) {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { projectKey },
    });
    return updatedProject;
  }
  async updateAppName(id:string,newAppName: string){
     const updatedAppName = await prisma.project.update({
      where: { id },
      data: { appName:newAppName },
    });
    return updatedAppName;
  }
  

  async getProjectByKey(key:string){
     return prisma.project.findMany({
      where:{projectKey:key}
     })
  }
  async deleteByProjectId(id:string){
    return prisma.project.delete({
      where:{id}
    });
  

  }
  async getProjectById(id:string){
    return prisma.project.findUnique({
      where :{id}
    })
  }

async getAllProjectsByAdmin(adminId: string): Promise<Project[]> {
  return prisma.project.findMany({
    where: { ownerId: adminId }, 
    orderBy: { createdAt: 'desc' } 
  });
}
}


export default ProjectRespository;