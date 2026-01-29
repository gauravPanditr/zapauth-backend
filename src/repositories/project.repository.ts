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
async deleteProjectById(projectId:string) {
  // We use a transaction so all deletes happen together or not at all
  return await prisma.$transaction(async (tx) => {
    
    // 1. Find all users belonging to this project to clean up their sessions
    const users = await tx.user.findMany({
      where: { projectId: projectId },
      select: { id: true }
    });
    const userIds = users.map(u => u.id);

    // 2. Delete all Sessions linked to those Users
    await tx.session.deleteMany({
      where: { userId: { in: userIds } }
    });

    // 3. Delete all Users linked to the Project
    await tx.user.deleteMany({
      where: { projectId: projectId }
    });

    // 4. Finally, delete the Project itself
    return await tx.project.delete({
      where: { id: projectId }
    });
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