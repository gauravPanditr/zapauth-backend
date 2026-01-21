import { Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/auth.user.utils";
import { JwtDecodedUser } from "../types/JwtDecodedUser";
import { AuthenticatedUserRequest } from "../types/requestwithUser";
import UserService from "../service/user.service";
import UserRepository from "../repositories/user.repository";

import SessionRepository from "../repositories/session.repository";
import { SessionService } from "../service/session.service";

const userService = new UserService(new UserRepository());
const sessionService = new SessionService(new SessionRepository());

export const authenticateUser = async (
  req: AuthenticatedUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1️Get token from cookie or header
    const token =
      req.cookies?.["user-access-token"] ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Access token missing" });
      return;
    }

    // 2️ Verify JWT (signature + expiry)
    let payload: JwtDecodedUser;
    try {
      payload = verifyAccessToken(token);
    } catch {
      res.status(401).json({ message: "Invalid or expired access token" });
      return;
    }

    // 3️ Validate session (DB-controlled access)
    const session = await sessionService.findByAccessToken(token);
    if (!session) {
      res.status(401).json({ message: "Session not found" });
      return;
    }

    if (session.accessTokenExpiry < new Date()) {
      res.status(401).json({ message: "Access token expired" });
      return;
    }

    // 4️ Fetch user
    const user = await userService.findById(payload.userId);
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    // 5️ Attach data to request
  req.user = {
  userId: payload.userId,   // normalized here
  email: user.email,
  username: user.username,
};
    req.session = {
      id: session.id,
      token,
    };

    next();
  } catch (err) {
    console.error("User auth error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
