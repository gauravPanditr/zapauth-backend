import { StatusCodes } from "http-status-codes";
import BaseError from "./base.error";

class NotFoundError extends BaseError {
  constructor(resource = "Resource", details?: any) {
    super(
      "NotFoundError",
      StatusCodes.NOT_FOUND,
      `${resource} not found`,
      details
    );
  }
}

export default NotFoundError;
