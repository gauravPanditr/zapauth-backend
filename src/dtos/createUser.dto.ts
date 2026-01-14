import {
  IsBoolean,
  IsDate,
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

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean; // optional

  @IsOptional()
  @IsString()
  token?: string; // <-- added ?

  @IsOptional()
  @IsDate()
  tokenExpiry?: Date; // <-- added ?

  constructor(
    
    email: string,
    password: string,
    username: string,
    isVerified?: boolean,
    token?: string,
    tokenExpiry?: Date
  ) {
    
    this.email = email;
    this.password = password;
    this.username = username;
    if (isVerified !== undefined) this.isVerified = isVerified;
    if (token) this.token = token;
    if (tokenExpiry) this.tokenExpiry = tokenExpiry;
  }
}
