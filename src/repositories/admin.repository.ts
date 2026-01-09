import CreateAdminDto from "../dtos/createAdmin.dto";

import { prisma } from "../config/dbConfig";
import { Admins } from "../../generated/prisma/client";
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

}

export default AdminRespository;