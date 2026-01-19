import {
  
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  
  MinLength,
} from "class-validator";

export default class CreateUserDTO {
  

  @IsOptional()
  @IsString()
  username: string; 

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  projectId:string

  constructor(
    
    email: string,
    password: string,
    username: string,
    projectId:string
  ) {
    
    this.email = email;
    this.password = password;
    this.username = username;
    this.projectId=projectId
  
  }
}
