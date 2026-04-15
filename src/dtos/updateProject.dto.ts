import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export default class UpdateProjectDto {

  @IsOptional()
  @IsString()
  projectName?: string;

  @IsOptional()
  @IsEmail()
  AppName?: string;

  @IsOptional()
  @Length(3, 50)
  @IsString()
  AppEmail?: string;
}