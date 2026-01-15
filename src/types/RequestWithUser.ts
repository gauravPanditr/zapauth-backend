import { Request } from "express";

import {JwtDecodedAdmin} from "./JwtDecodedUser";

export interface RequestWithUser extends Request {
    user: JwtDecodedAdmin;
}