import {  Response } from "express";
import UserRepository from "../repositories/user.repository";
import UserService from "../service/user.service";
import CreateUserDTO from "../dtos/createUser.dto";
import { AuthenticatedProjectRequest } from "../types/authenticatedRequest";

const userService = new UserService(new UserRepository());

const createUser = async (
  req: AuthenticatedProjectRequest,
  res: Response
) => {
  const projectId = req.project?.id;

  if (!projectId) {
    return res.status(401).json({
      message: "Project not authenticated",
    });
  }

  const { email, password, username } = req.body;

  
  const dto = new CreateUserDTO(email, password, username,projectId);

  const user = await userService.createUser(dto);

return  res.status(201).json({
    message: "User created successfully",
    data: user,
  });
};


export default{
    createUser
}