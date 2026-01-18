import { StatusCodes } from "http-status-codes";
import ProjectRespository from "../repositories/project.repository";
import ProjectService from "../service/project.service";
import { Request, Response } from "express";
import { CreateProjectDTO } from "../dtos/createProjectdto";
import UnauthorisedError from "../errors/unauthorisedError";
import { AuthenticatedAdminRequest } from "../types/RequestWithUser";

const projectService = new ProjectService(new ProjectRespository());

 const createProject = async (req:AuthenticatedAdminRequest, res: Response) => {
  try {
    
     const adminId = req.admin?.id;

    if (!adminId) {
      throw new UnauthorisedError("Unauthorized");
    }
  const dto = new CreateProjectDTO(req.body);
    console.log("Project DTO:", dto);


    const project = await projectService.createProject(dto, adminId);

  
    return res.status(201).json({
      success: true,
      message: "Project created successfully ",
      data: project,
    });
  } catch (err: any) {
    console.error("Create Project Error:", err);

    // 5️⃣ Handle Unauthorized separately
    if (err instanceof UnauthorisedError) {
      return res.status(401).json({ error: err.message });
    }

    // 6️⃣ Generic server error
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProjectsByAdmin=async(req:Request,res:Response)=>{
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
       
      const response=await projectService.getAllProjectsByAdmin(id);
      return  res.status(201).json(response);

    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// const updateProject=async(req:Request,res:Response)=>{
//    try {
//     const response=await projectService.(req.body);
//       res.status(201).json(response);
//    } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//    }
// }

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
    // updateProject,
    deleteProjectById,
    getAllProjectsByAdmin
}

