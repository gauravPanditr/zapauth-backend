import { Request } from "express";

import JwtDecodedUser from "./JwtDecodedUser";

export interface RequestWithUser extends Request {
    user: JwtDecodedUser;
}