import { StatusCodes } from "http-status-codes";
import ProjectRespository from "../repositories/project.repository";
import ProjectService from "../service/project.service";
import {  Response,Request } from "express";
import { CreateProjectDTO } from "../dtos/createProjectdto";
import UnauthorisedError from "../errors/unauthorisedError";
import { AuthenticatedAdminRequest } from "../types/requestwithAdmin";
import { AuthenticatedProjectRequest } from "../types/authenticatedRequest";

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
const createNewProjectKey = async (
  req: AuthenticatedProjectRequest,
  res: Response
) => {
  try {
    
    const projectId = req.project?.id;
 
    if (!projectId) {
      return res.status(400).json({
        message: "Project ID missing from request",
      });
    } 
    const updatedProject = await projectService.updateProjectKey(projectId);
    return res.status(200).json({
      success: true,
      message: "New project key generated successfully",
      data: {
        projectId: updatedProject.id,
        projectKey: updatedProject.projectKey,
      },
    });
  } catch (error: any) {
    console.error("CreateNewProjectKey Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
const getAllProjectsByAdmin=async(req:AuthenticatedAdminRequest,res:Response)=>{
    try {
         const adminId = req.admin?.id;

           if (!adminId) {
               return res.status(StatusCodes.BAD_REQUEST).json({
                   message: 'Admin ID is required',
                   data: {},
                   err: {},
                   success: false
               });
           }
       
      const response=await projectService.getAllProjectsByAdmin(adminId);
      return  res.status(201).json(response);

    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateAppName = async (req: AuthenticatedProjectRequest, res: Response) => {
  try {
    const projectId = req.project?.id;

    if (!projectId) {
      return res.status(400).json({
        message: "Project ID missing from request",
      });
    }

    const { appName } = req.body;

    if (!appName) {
      return res.status(400).json({
        message: "appName is required in the request body",
      });
    }

    
    const updatedProject = await projectService.updateProjectAppName(projectId, appName);

    return res.status(200).json({
      success: true,
      message: "App name updated successfully",
      data: {
        projectId: updatedProject.id,
        appName: updatedProject.appName,
      },
    });
  } catch (error: any) {
    console.error("UpdateAppName Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const deleteProjectById=async(req:Request,res:Response)=>{
try {
     const { projectId } = req.params;
     
    if (!projectId) {
      return res.status(400).json({
        message: "Project ID missing from request",
      });
    }
    const response= await projectService.deleteProjectById(projectId);
    
     return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      date:response
     
    });
} catch (error) {
  return res.status(500).json({ error: 'Internal Server Error' });
}
}

export default{
    createProject,
    updateAppName,
    deleteProjectById,
    getAllProjectsByAdmin,
    createNewProjectKey
}

