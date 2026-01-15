import { Session } from "@prisma/client";
import { prisma } from "../config/dbConfig";
import { CreateSessionDTO } from "../dtos/sessionUser.dto";

class SessionRespository{
  async createSession(dto: CreateSessionDTO) :Promise<Session|null>{
    const session = await prisma.session.create({
      data: {
        userId: dto.userId,
        projectId:dto.projectId,
        accessToken: dto.accessToken,
        accessTokenExpiry: dto.accessTokenExpiry,
        refreshToken: dto.refreshToken,
        refreshTokenExpiry: dto.refreshTokenExpiry,
        deviceType: dto.deviceType as any,
        userAgent: dto.userAgent,
        networkIP: dto.ipAddress ?? null,
        os: dto.os,
      },
    });
    return session;
  }
 async deleteExpiredSessions(userId: string) {
    return prisma.session.deleteMany({
      where: {
        userId,
        refreshTokenExpiry: { lt: new Date() },
      },
    });
  }
async findSessionByRefreshToken(refreshToken: string) {
    return prisma.session.findUnique({
       where:{id:refreshToken}
    });
  }


  async deleteSessionById(sessionId: string) {
    return prisma.session.delete({
      where: { id: sessionId },
    });
  }
  


}

export default SessionRespository;