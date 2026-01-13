
import { IsOptional, IsString, IsEmail, IsUUID } from "class-validator";

export class UpdateProjectDTO {
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsString({ message: "projectName must be a string" })
  projectName?: string;

  @IsOptional()
  @IsString({ message: "appName must be a string" })
  appName?: string;

  @IsOptional()
  @IsEmail({}, { message: "appEmail must be a valid email address" })
  appEmail?: string;
}
