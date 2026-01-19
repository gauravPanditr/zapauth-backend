import CreateUserDTO from "../dtos/createUser.dto";


import { prisma } from "../config/dbConfig";
import { User } from "@prisma/client";
class UserRepository{

async createUser(dto:CreateUserDTO) :Promise<User>{
    
     return prisma.user.create({
      data: {
        projectId:dto.projectId,
        username: dto.username,
        email: dto.email,
        password: dto.password, 
        
      },
    });

}
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
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