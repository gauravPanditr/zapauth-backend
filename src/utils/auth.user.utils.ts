import jwt from "jsonwebtoken";
import serverConfig from "../config";
import { JwtPayloadUser } from "../types/jwtPayload";


export function generateAccessToken(payload: JwtPayloadUser): string {
  return jwt.sign(payload, serverConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(payload: JwtPayloadUser): string {
  return jwt.sign(payload, serverConfig.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyAccessToken(token: string): JwtPayloadUser {
  return jwt.verify(token, serverConfig.ACCESS_TOKEN_SECRET) as JwtPayloadUser;
}

export function verifyRefreshToken(token: string): JwtPayloadUser {
  return jwt.verify(token, serverConfig.REFRESH_TOKEN_SECRET) as JwtPayloadUser;
}
