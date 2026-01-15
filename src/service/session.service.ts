import SessionRepository from "../repositories/session.repository";
import { CreateSessionDTO } from "../dtos/sessionUser.dto";
import { DeviceType } from "../types/device";

class SessionService {
  constructor(private sessionRepo: SessionRepository) {}

  async createSession(dto: CreateSessionDTO) {
    await this.sessionRepo.deleteExpiredSessions(dto.userId);
    return await this.sessionRepo.createSession(dto);
  }

  async refreshSession(
    refreshToken: string,
    newAccessToken: string,
    newAccessTokenExpiry: Date
  ) {
    const session = await this.sessionRepo.findSessionByRefreshToken(refreshToken);
    if (!session) throw new Error("Invalid refresh token");

    return await this.sessionRepo.createSession({
      userId: session.userId,
      projectId: session.projectId,
      accessToken: newAccessToken,
      accessTokenExpiry: newAccessTokenExpiry,
      refreshToken: session.refreshToken,
      refreshTokenExpiry: session.refreshTokenExpiry,
      deviceType: session.deviceType as DeviceType, // now safe
      userAgent: session.userAgent,
      ipAddress: session.networkIP,
      os: session.os,
    });
  }

  async deleteExpired(userId: string) {
    return this.sessionRepo.deleteExpiredSessions(userId);
  }
}

export default SessionService;
