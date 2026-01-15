import { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import UserService from "../service/user.service";
import CreateUserDTO from "../dtos/createUser.dto";

const userService = new UserService(new UserRepository());

const createUser=async(req:Request,res:Response)=>{
    try {
    const projectId = req.headers["project-id"] as string;
    const projectKey = req.headers["project-key"] as string;
        
    if (!projectId || !projectKey) {
      return res.status(401).json({ error: "Project credentials missing" });
    }

    const dto: CreateUserDTO = req.body;

    const user = await userService.createUser(dto, projectId, projectKey);

    return res.status(201).json(user);
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
}


export default{
    createUser
}