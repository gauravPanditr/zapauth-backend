import { Request } from "express";

import {JwtDecodedAdmin} from "./JwtDecodedUser";

export interface AuthenticatedAdminRequest extends Request {
    admin?: JwtDecodedAdmin;
}