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

  async findByEmailAndProject(email: string, projectId: string) {
    return prisma.user.findFirst({
      where: { email, projectId },
      include: { project: true },
    });
  }

  async findByTokenAndProject(token: string, projectId: string) {
    return prisma.user.findFirst({
      where: { token, projectId },
    });
  }
async findUserById(id:string){
   const userId=await prisma.user.findUnique({
    where:{id}
   });
   return userId;
}
async updateResetToken(userId: string, token: string, expiry: Date) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        token,
        tokenExpiry: expiry,
      },
    });
  }
 async findByToken(token: string) {
    return prisma.user.findFirst({ where: { token } });
  }

  async  update(id: string, data: any) {
    return prisma.user.update({ where: { id }, data });
  }
 async updatePassword(userId: string, hashedPassword: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        token: null,
        tokenExpiry: null,
      },
    });
  }


}


export default UserRepository;