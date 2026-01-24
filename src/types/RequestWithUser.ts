import {Request} from "express";

import {JwtDecodedUser} from "./JwtDecodedUser";

export interface AuthenticatedUserRequest extends Request {
  
    session?: { id: string; token: string; };
    user?: JwtDecodedUser;
}