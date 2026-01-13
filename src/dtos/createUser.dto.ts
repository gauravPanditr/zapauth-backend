import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";

export class CreateUserDTO {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  projectId :string ;

  @IsOptional()
  @IsString()
  username?: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string | undefined; 

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  token?: string;

  @IsOptional()
  tokenExpiry?: Date;
}
