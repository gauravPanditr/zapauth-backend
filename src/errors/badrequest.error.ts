import { StatusCodes } from "http-status-codes";
import BaseError from "./base.error";

class BadRequest extends BaseError{
    constructor(details :any){
        super(
            "Bad Request",
            StatusCodes.BAD_REQUEST,
            "Internal Server Error",
            details,
        );
    }
}



export default BadRequest;