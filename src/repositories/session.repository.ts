import {prisma} from "../config/dbConfig";
import { CreateSessionDTO } from "../dtos/sessionUser.dto";


class SessionRepository {
  create(dto: CreateSessionDTO) {
    return prisma.session.create({
      data: {
        userId: dto.userId,
        projectId: dto.projectId,
        accessToken: dto.accessToken,
        accessTokenExpiry: dto.accessTokenExpiry,
        refreshToken: dto.refreshToken,
        refreshTokenExpiry: dto.refreshTokenExpiry,
        deviceType: "DESKTOP",
        userAgent: dto.userAgent,
        
        os: dto.os,
      },
    });
  }

  findByRefreshToken(refreshToken: string) {
    return prisma.session.findFirst({
      where: { refreshToken },
    });
  }

  deleteById(id: string) {
    return prisma.session.delete({ where: { id } });
  }

  deleteExpired(userId: string) {
    return prisma.session.deleteMany({
      where: {
        userId,
        refreshTokenExpiry: { lt: new Date() },
      },
    });
  }
}

export default SessionRepository;
