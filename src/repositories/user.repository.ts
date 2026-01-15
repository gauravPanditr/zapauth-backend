import CreateUserDTO from "../dtos/createUser.dto";


import { prisma } from "../config/dbConfig";
import { User } from "@prisma/client";
class UserRepository{

async createUser(dto:CreateUserDTO,projectId: string) :Promise<User>{
    
     return prisma.user.create({
      data: {
        projectId,
        username: dto.username,
        email: dto.email,
        password: dto.password, 
        isVerified: dto.isVerified ?? false,
        token: dto.token ?? null,
        tokenExpiry: dto.tokenExpiry ?? null,
      },
    });

}
 async findByEmail(
    email: string,
    projectId: string
  ): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        email,
        projectId,
      },
    });
  }

async findUserByEamiId(userEmail:string){
     const email=await prisma.user.findFirst({
      where:{email:userEmail}
     })
    return email;
}
async findUserById(id:string){
   const userId=await prisma.user.findUnique({
    where:{id}
   });
   return userId;
}



}


export default UserRepository;