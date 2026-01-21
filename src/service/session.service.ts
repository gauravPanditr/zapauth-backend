// services/session.service.ts
import  SessionRepository  from "../repositories/session.repository";
import { CreateSessionDTO } from "../dtos/sessionUser.dto";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.user.utils";


export class SessionService {
 
    private sessionRepository: SessionRepository
    constructor(sessionRepository: SessionRepository) {
        this.sessionRepository = sessionRepository;
    }

  async createLoginSession(sessionDTO: CreateSessionDTO) {
    // Check for existing session
    const existing = await this.sessionRepository.findByUserAndDevice(
      sessionDTO.userId,
      sessionDTO.userAgent
    );
    if (existing) throw new Error("Session already exists for this device");

    // Generate tokens if not present
    if (!sessionDTO.accessToken) {
      sessionDTO.accessToken = generateAccessToken({
        userId: sessionDTO.userId,
        projectId: sessionDTO.projectId,
        email: "", 
        username:""
      });
    }

    if (!sessionDTO.refreshToken) {
      sessionDTO.refreshToken = generateRefreshToken({
        userId: sessionDTO.userId,
        projectId: sessionDTO.projectId,
        email: "", 
        username:""
      });
    }

    // Set expiries if missing
    if (!sessionDTO.accessTokenExpiry)
      sessionDTO.accessTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
    if (!sessionDTO.refreshTokenExpiry)
      sessionDTO.refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await this.sessionRepository.createSession(sessionDTO);
    return {
      session,
      accessToken: sessionDTO.accessToken,
      refreshToken: sessionDTO.refreshToken,
    };
  }

  async findByAccessToken(accessToken:string){
      return await this.sessionRepository.findByAccessToken(accessToken);
  }
  async findBySessionId(sessionId:string){
     return await this.sessionRepository.findBySesssionId(sessionId);
  }
 
}
