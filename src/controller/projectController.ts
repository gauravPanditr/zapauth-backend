import { StatusCodes } from "http-status-codes";
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
const updateProject=async(req:Request,res:Response)=>{
   try {
    const response=await projectService.updateProject(req.body);
      res.status(201).json(response);
   } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
   }
}

const deleteProjectById=async(req:Request,res:Response)=>{
try {
      const { id } = req.params;
           if (!id) {
               return res.status(StatusCodes.BAD_REQUEST).json({
                   message: 'Project ID is required',
                   data: {},
                   err: {},
                   success: false
               });
           }
     const response=await projectService.deleteProjectById(id);
   return  res.status(201).json(response);
} catch (error) {
  return res.status(500).json({ error: 'Internal Server Error' });
}
}

export default{
    createProject,
    updateProject,
    deleteProjectById
}

