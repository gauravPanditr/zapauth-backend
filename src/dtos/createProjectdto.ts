import { IsNotEmpty, IsEmail } from "class-validator";


export class CreateProjectDTO {
  @IsNotEmpty({ message: "Project name is required" })
 
  projectName: string;

  @IsNotEmpty({ message: "App name is required" })
  
  appName: string;

  @IsNotEmpty({ message: "App email is required" })
  @IsEmail({}, { message: "Invalid email format" })

  appEmail: string;

  @IsNotEmpty({ message: "Project key is required" })
  
  projectKey: string;

  @IsNotEmpty({ message: "Owner ID is required" })
  owner: string;

 
  constructor(data: Partial<CreateProjectDTO>) {
    this.projectName = data.projectName ?? "";
    this.appName = data.appName ?? "";
    this.appEmail = data.appEmail ?? "";
    this.projectKey = data.projectKey ?? "";
    this.owner = data.owner ?? "";
  }
}
