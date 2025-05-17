
import mongoose from "mongoose";
import { Request } from "express";

export interface IApiError {
  message: string;
  errors?: any[] | any | undefined;
  statusCode: number;
  type: string;
  data: null;
  success: boolean;
  stack?: string | undefined;
}

export interface IApiResponse {
  message: string;
  statusCode: number;
  data: any;
  type: string;
  success: boolean;
}

export interface IRequest extends Request {
  project?: {
    id?: mongoose.Types.ObjectId;
    key?: string;
  };
  user?: {
    id?: mongoose.Types.ObjectId;
  };
  admin?: {
    id?: mongoose.Types.ObjectId;
  };
  session?: {
    id?: mongoose.Types.ObjectId;
    token?: string;
  };
}
