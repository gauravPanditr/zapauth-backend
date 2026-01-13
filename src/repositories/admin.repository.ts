import CreateAdminDto from "../dtos/createAdmin.dto";

import { prisma } from "../config/dbConfig";
import type { Admins,RefreshToken } from "@prisma/client";

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