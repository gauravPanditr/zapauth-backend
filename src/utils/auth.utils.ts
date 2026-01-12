import jwt from "jsonwebtoken";
import serverConfig from "../config";
import JwtDecodedUser from "../types/JwtDecodedUser";
import { JwtPayload } from "../types/jwtPayload";
// ================================
// JWT Payload type (just an interface, no DTO import)
// ================================

// ================================
// General JWT (1h expiration)
// ================================
export function generateJWT(payload: JwtPayload): string {
  return jwt.sign(payload, serverConfig.JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): JwtDecodedUser {
  const decoded = jwt.verify(token, serverConfig.JWT_SECRET);
  return decoded as JwtDecodedUser;
}

// ================================
// Access Token (short-lived)
// ================================
export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, serverConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

// ================================
// Refresh Token (long-lived)
// ================================
export function generateRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, serverConfig.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

// ================================
// Verify Access Token
// ================================
export function verifyAccessToken(token: string): JwtDecodedUser {
  return jwt.verify(token, serverConfig.ACCESS_TOKEN_SECRET) as JwtDecodedUser;
}

// ================================
// Verify Refresh Token
// ================================
export function verifyRefreshToken(token: string): JwtDecodedUser {
  return jwt.verify(token, serverConfig.REFRESH_TOKEN_SECRET) as JwtDecodedUser;
}
