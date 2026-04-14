import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export default class UpdateAdminDto {

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Length(3, 50)
  @IsString()
  password?: string;
}