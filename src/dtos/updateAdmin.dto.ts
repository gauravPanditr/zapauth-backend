
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export default class UpdateAdminDto {
    

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(3, 50)
    @IsString()
    password: string;

   


    constructor(email: string, password: string,username: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        
    }
}
