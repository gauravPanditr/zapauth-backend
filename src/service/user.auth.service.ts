import bcrypt from "bcryptjs";
import SessionService from "./session.service";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth.user.utils";
import { DeviceType } from "../types/device";
import UserService from "./user.service";
import {JwtPayloadUser} from "../types/jwtPayload";

class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {}

  async login(
    email: string,
    password: string,
    projectId: string,
    meta: {
      userAgent: string;
      os: string;
      ip: string;
      deviceType: DeviceType;
    }
  ) {
    // ✅ use UserService (not repository)
    const user = await this.userService.findByEmail(email, projectId);
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    // ✅ payload now matches token utils
    const payload: JwtPayloadUser = {
      id: user.id,
      email: user.email,
    
      projectId:projectId
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await this.sessionService.create({
      userId: user.id,
      projectId,
      accessToken,
      accessTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
      refreshToken,
      refreshTokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      deviceType: meta.deviceType as any,
      userAgent: meta.userAgent,
      ipAddress: meta.ip,
      os: meta.os,
    });

    return { accessToken, refreshToken };
  }
}

export default AuthService;
