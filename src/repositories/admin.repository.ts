import CreateAdminDto from "../dtos/createAdmin.dto";
import bcrypt from 'bcrypt-ts';

import { prisma } from "../config/dbConfig";
import { Admins } from "../../generated/prisma/client";
import LoginAdminDto from "../dtos/loginAdmin.dto";
class AdminRespository{
async createAdmin(adminDetails:CreateAdminDto):Promise<Admins>{

  const newAdmin=await prisma.admins.create({
    data:{
         username:adminDetails.username,
            email:adminDetails.email,
       password:adminDetails.password
       
    }
  })
  return newAdmin;
}
    async loginAdmin(dto: LoginAdminDto): Promise<Admins | null> {
    const admin = await prisma.admins.findUnique({ where: { email: dto.email } });
    if (!admin) return null;

    const validPassword = await bcrypt.compare(dto.password, admin.password);
    if (!validPassword) return null;

    return admin;
  }
  async getAdminById(id:string):Promise<Admins| null>{
    const admin=await prisma.admins.findUnique({where :{id}});
    if(!admin) return null;
    return admin;
  }


}



export default AdminRespository;