// import { Request, Response } from "express";
// import { Project } from "../model/project.model";

// // Create a new project
// export const createProject = async (req: Request, res: Response) => {
//   try {
//     const { projectName, appName, appEmail, projectKey } = req.body;
//     const owner = req.body.owner; // admin ID

//     if (!projectName || !appName || !appEmail || !projectKey || !owner) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingProject = await Project.findOne({ projectKey });
//     if (existingProject) {
//       return res.status(400).json({ message: "Project key already exists" });
//     }

//     const project = await Project.create({
//       projectName,
//       appName,
//       appEmail,
//       projectKey,
//       owner,
//     });

//     return res.status(201).json(project);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Get all projects for a specific admin
// export const getProjectsByAdmin = async (req: Request, res: Response) => {
//   try {
//     const adminId = req.params.adminId;

//      if (!adminId) {
//       return res.status(400).json({ message: "Admin ID is required" });
//     }
//     const projects = await Project.find({ owner: adminId });
//     return res.status(200).json(projects);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
