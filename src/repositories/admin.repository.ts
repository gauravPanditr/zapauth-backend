import CreateAdminDto from "../dtos/createAdmin.dto";

import { prisma } from "../config/dbConfig";
import { Admins } from "../../generated/prisma/client";

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
    if (!admin) return null;
    return admin;
  }


}

export default AdminRespository;