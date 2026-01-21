import {prisma} from "../config/dbConfig";
import { CreateSessionDTO } from "../dtos/sessionUser.dto";


class SessionRepository {

  
   async createSession(data: CreateSessionDTO) {
    return prisma.session.create({ data });
  }
  async findBySesssionId(sessionId:string){
     return await prisma.session.findUnique({
       where:{id:sessionId}
     })
  }

 async findByRefreshToken(refreshToken: string) {
    return prisma.session.findFirst({
      where: { refreshToken },
    });
  }
  async findByAccessToken(accessToken:string){
     return prisma.session.findFirst({
       where:{accessToken}
     })
  }

 async deleteById(id: string) {
    return prisma.session.delete({ where: { id } });
  }
   async findByUserAndDevice(userId: string, userAgent: string) {
    return prisma.session.findFirst({
      where: { userId, userAgent },
    });
  }


 async deleteExpired(userId: string) {
    return prisma.session.deleteMany({
      where: {
        userId,
        refreshTokenExpiry: { lt: new Date() },
      },
    });
  }
}

export default SessionRepository;
