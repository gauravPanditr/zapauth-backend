import { log } from "console"

export const logger=(type:string, message:string)=>{
 log(`[${new Date().toISOString()}] ${type}: ${message}`);
}