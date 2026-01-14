import CreateUserDTO from "../dtos/createUser.dto";


import { prisma } from "../config/dbConfig";
import { User } from "@prisma/client";
class UserRepository{

async createUser(dto:CreateUserDTO) :Promise<User>{
    
     const projectId=await prisma.project.findUnique({
        where :{id:dto.projectId},
        select:{id:true}

     });
     
    if (!projectId) {
      throw new Error("Project not found");

    }
     return prisma.user.create({
      data: {
        projectId: dto.projectId,
        username: dto.username,
        email: dto.email,
        password: dto.password, 
        isVerified: dto.isVerified ?? false,
        token: dto.token ?? null,
        tokenExpiry: dto.tokenExpiry ?? null,
      },
    });

}



}


export default UserRepository;