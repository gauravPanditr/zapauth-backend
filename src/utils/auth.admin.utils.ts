import jwt from "jsonwebtoken";
import serverConfig from "../config";

import  {JwtPayload}  from "../types/jwtPayload";
import { JwtDecodedAdmin } from "../types/JwtDecodedUser";
// ================================
// JWT Payload type (just an interface, no DTO import)
// ================================

// ================================
// General JWT (1h expiration)
// ================================
export function generateJWT(payload: JwtPayload): string {
  return jwt.sign(payload, serverConfig.JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): JwtDecodedAdmin {
  const decoded = jwt.verify(token, serverConfig.JWT_SECRET);
  return decoded as JwtDecodedAdmin;
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
export function verifyAccessToken(token: string): JwtDecodedAdmin {
  return jwt.verify(token, serverConfig.ACCESS_TOKEN_SECRET) as JwtDecodedAdmin;
}

// ================================
// Verify Refresh Token
// ================================
export function verifyRefreshToken(token: string): JwtDecodedAdmin {
  return jwt.verify(token, serverConfig.REFRESH_TOKEN_SECRET) as JwtDecodedAdmin;
}

