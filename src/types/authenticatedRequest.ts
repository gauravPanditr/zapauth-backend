import { Request } from "express";
import { ProjectRequest } from "./project.types";

export interface AuthenticatedProjectRequest extends Request {
  project?: ProjectRequest;
}
