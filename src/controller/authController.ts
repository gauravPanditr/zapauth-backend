import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import UserService from "../service/user.service";
const userService = new UserService(new UserRepository());

const createUser=async(req:Request,res:Response)=>{
     try {
        const response= await userService.createUser(req.body);
         return res.json(response);
     } catch (error) {
         return res.status(500).json({ error: "Internal Server Error" });
     }
}


export default{
    createUser
}