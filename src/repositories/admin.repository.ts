import CreateAdminDto from "../dtos/createAdmin.dto";
import { prisma } from "../config/dbConfig";
import type { Admins,RefreshToken } from "@prisma/client";
import UpdateAdminDto from "../dtos/updateAdmin.dto";

class AdminRespository {

  async createAdmin(adminDetails: CreateAdminDto): Promise<Admins> {

    const newAdmin = await prisma.admins.create({
      data: {
        username: adminDetails.username,
        email: adminDetails.email,
        password: adminDetails.password

      }
    })
    return newAdmin;
  }
async deleteAdmin(adminId: string) {
    return await prisma.admins.delete({ where: { id: adminId } });
  }

  async getProjectsByOwner(adminId: string) {
    return await prisma.project.findMany({ where: { ownerId: adminId } });
  }

  async deleteProjectsByOwner(adminId: string) {
    return await prisma.project.deleteMany({ where: { ownerId: adminId } });
  }

  async deleteUsersByProjectIds(projectIds: string[]) {
    return await prisma.user.deleteMany({ where: { projectId: { in: projectIds } } });
  }

  async deleteSessionsByProjectIds(projectIds: string[]) {
    return await prisma.session.deleteMany({ where: { projectId: { in: projectIds } } });
  }


  async deleteRefreshTokensByAdminId(adminId: string) {
    return await prisma.refreshToken.deleteMany({ where: { adminId } });
  }


 async deleteTokens(adminId: string){
    return prisma.admins.update({
      where: { id: adminId },
      data: {
       refreshTokens: {
        deleteMany: {},
      },
        
      },
    });
  }
  async deleteById(id:string){
     return prisma.admins.delete({where:{id}});
  }

  async getAdminByUsername(username: string): Promise<Admins | null> {
    const user = await prisma.admins.findFirst({ where: { username: username } });
    return user;
  }
  async getAdminByEmail(adminEmail:string):Promise<Admins | null>{
     const email=await prisma.admins.findFirst({where :{email:adminEmail}});
     return email;
  }

  async getAdminById(id: string): Promise<Admins | null> {
    const admin = await prisma.admins.findUnique({ where: { id } });
    return admin;
  }
  async updateAdmin(adminId: string, data: UpdateAdminDto) {
  return prisma.admins.update({
    where: { id: adminId },
    data,
  });
}

 async saveRefreshToken(
    token: string,
    adminId: string,
    expiresAt: Date
  ): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data: { token, adminId, expiresAt },
    });
  }
 
  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({ where: { token } });
  }

  async deleteRefreshToken(token: string): Promise<RefreshToken> {
    return prisma.refreshToken.delete({ where: { token } });
  }
  async getAdminByRefreshToken(token: string): Promise<Admins | null> {
  return prisma.admins.findFirst({
    where: { refreshTokens: { some: { token } } },
  });
}

}

export default AdminRespository;