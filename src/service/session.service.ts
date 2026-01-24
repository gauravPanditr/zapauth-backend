// services/session.service.ts
import  SessionRepository  from "../repositories/session.repository";
import { CreateSessionDTO } from "../dtos/sessionUser.dto";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.user.utils";
import { verify } from "jsonwebtoken";
import serverConfig from "../config";
import UnauthorisedError from "../errors/unauthorisedError";
import { JwtPayloadUser } from "../types/jwtPayload";



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
   async refreshAccessToken(refreshToken: string) {
  if (!refreshToken) throw new UnauthorisedError("Refresh token missing");

  // 1. Verify refresh token (no need to generate a new one)
  let payload: JwtPayloadUser;
  try {
    payload = verify(refreshToken, serverConfig.REFRESH_TOKEN_SECRET) as JwtPayloadUser;
  } catch (err) {
    throw new UnauthorisedError("Invalid refresh token");
  }

  // 2. Extract admin info
  const { userId, email, username } = payload;
  const cleanPayload = { userId, email, username };

  // 3. Generate only a new access token
  const newAccessToken = generateAccessToken(cleanPayload);

  return { accessToken: newAccessToken };
}

 
}
