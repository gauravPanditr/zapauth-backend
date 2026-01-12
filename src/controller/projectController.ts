import ProjectRespository from "../repositories/project.repository";
import ProjectService from "../service/project.service";
import { Request, Response } from "express";

const projectService = new ProjectService(new ProjectRespository());

 const createProject = async (req:Request,res:Response) => {
  try {
    const response = await projectService.createProject(req.body); 
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default{
    createProject
}

