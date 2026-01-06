import { Schema, model, Types } from "mongoose";

// Basic Project interface
export interface IProject {
  projectName: string;
  appName: string;
  appEmail: string;
  projectKey: string;
  owner: Types.ObjectId; // reference to Admin
}

// Basic Project Schema
const ProjectSchema = new Schema<IProject>(
  {
    projectName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    appName: {
      type: String,
      required: true,
      trim: true,
    },
    appEmail: {
      type: String,
      required: true,
      trim: true,
    },
    projectKey: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Admin", // reference to Admin model
      required: true,
    },
  },
  { timestamps: true } 
);

// Create and export Project model
export const Project = model<IProject>("Project", ProjectSchema);
