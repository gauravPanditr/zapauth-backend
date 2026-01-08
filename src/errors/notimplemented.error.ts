import BaseError from "./base.error";
import { StatusCodes } from "http-status-codes";

class NotImplementedError extends BaseError {
  constructor(methodName: string) {
    super(
      "NotImplementedError",
      StatusCodes.NOT_IMPLEMENTED,
      `${methodName} is not implemented`,
      {}
    );
  }
}

export default NotImplementedError;
