// // import { Request, Response } from "express";
// // import mongoose from "mongoose";
// // import { User } from "../model/user.model";
// // import { Project } from "../model/project.model";

// import { plainToInstance } from "class-transformer";
// import AdminService from "../service/admin.service";
// import CreateAdminDto from "../dtos/createAdmin.dto";
// import InternalServerError from "../errors/internalServer.error";




// class AdminController{
//     private adminService=new AdminService();
//     async signup(req:Request ,res:Response){
//         try{
//             const createAdminDto=plainToInstance(CreateAdminDto,req.body);


//             const admin=await this.adminService.createAdmin(createAdminDto);
//             return res;
//             console.log(admin);
            
            
//         }
//     catch(err:any){
//         console.error(err);
//         return new InternalServerError(err);
//     }

// }
  
// }

// export default AdminController;

// export const signup = async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;
//     const projectId = req.headers["project-id"] as string;
//     const projectKey = req.headers["project-key"] as string;

//     if (!projectId || !projectKey) {
//       return res.status(400).json({
//         error: "Project ID and Project Key are required",
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(projectId)) {
//       return res.status(400).json({ error: "Invalid project ID format" });
//     }

//     const project = await Project.findOne({
//       _id: projectId,
//       projectKey,
//     });

//     if (!project) {
//       return res
//         .status(400)
//         .json({ error: "Invalid project ID or project key" });
//     }

//     const existingUser = await User.findOne({
//       email: email.toLowerCase(),
//       project: project._id,
//     });

//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ error: "User already exists in this project" });
//     }

//     const user = await User.create({
//       username,
//       email: email.toLowerCase(),
//       password, 
//       project: project._id,
//     });

//     return res.status(201).json({
//       message: "User created successfully",
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         project: user.project,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };


// //  LOGIN
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const projectId = req.headers["project-id"] as string;
//     const projectKey = req.headers["project-key"] as string;

//     if (!projectId || !projectKey) {
//       return res.status(400).json({ error: "Project ID and Project Key are required" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(projectId)) {
//       return res.status(400).json({ error: "Invalid project ID format" });
//     }

//     const projectObjectId = new mongoose.Types.ObjectId(projectId);

//     const project = await Project.findOne({ _id: projectObjectId, projectKey });
//     if (!project) {
//       return res.status(400).json({ error: "Invalid project ID or project key" });
//     }

//     const user = await User.findOne({ email, project: project._id });
//     if (!user) {
//       return res.status(400).json({ error: "User not found in this project" });
//     }

//     const isValid = await user.validatePassword(password);
//     if (!isValid) {
//       return res.status(400).json({ error: "Invalid password" });
//     }

//     return res.status(200).json({
//       message: "Login successful",
//       user: {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         project: user.project,
//       },
//     });
//   } catch (err: any) {
//     console.error(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };
