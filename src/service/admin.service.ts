
import CreateAdminDto from "../dtos/createAdmin.dto";
import LoginAdminDto from "../dtos/loginAdmin.dto";
import NotFoundError from "../errors/notfound.error";
import UnauthorisedError from "../errors/unauthorisedError";
import AdminRespository from "../repositories/admin.repository"
import bcrypt from "bcryptjs"
import { generateAccessToken, generateRefreshToken ,verifyAccessToken} from "../utils/auth.admin.utils";
import type { Admins } from "@prisma/client";
import  {JwtPayload} from "../types/jwtPayload"
import { verify } from "jsonwebtoken";
import serverConfig from "../config"


class AdminService {

    private adminRepository: AdminRespository
    constructor(adminRepository: AdminRespository) {
        this.adminRepository = adminRepository;
    }

    async createAdmin(dto: CreateAdminDto) {
        dto.password = bcrypt.hashSync(dto.password);
        const admin = await this.adminRepository.createAdmin(dto);
        return admin;

    }

   async loginAdmin(dto: LoginAdminDto) {
    const admin = await this.adminRepository.getAdminByEmail(dto.email);
    if (!admin) {
      throw new NotFoundError("email", dto.email);
    }

   
    const doesPasswordMatch = bcrypt.compareSync(
      dto.password,
      admin.password
    );

    if (!doesPasswordMatch) {
      throw new UnauthorisedError();
    }

  
    const payload: JwtPayload = {
      id: admin.id,
      email: admin.email,
      username: admin.username,
    };

   
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

     console.log(accessToken);
     
    
    await this.adminRepository.saveRefreshToken(
      refreshToken,
      admin.id,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

  
    return {
      accessToken,
      refreshToken,
    };
  }

    async getAdminFromAccessToken(accessToken: string) {
    let payload: JwtPayload;

    try {
      payload = verifyAccessToken(accessToken);
      
      
    } catch {
      throw new UnauthorisedError("Invalid or expired access token");
    }

    const admin = await this.adminRepository.getAdminById(payload.id);
    if (!admin) {
      throw new NotFoundError("admin", payload.id);
    }

    return admin;
  }


    async getAdminById(id: string): Promise<Admins> {
        try {
            const response: Admins | null = await this.adminRepository.getAdminById(id);
            if (!response) {
                throw { error: "Not found" }
            }
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    

    async refreshTokens(refreshToken: string) {
      
    if (!refreshToken) throw new UnauthorisedError("Refresh token missing");

    // 1. Find admin with this refresh token
     
    const admin = await this.adminRepository.getAdminByRefreshToken(refreshToken);
   
    if (!admin) throw new UnauthorisedError("Invalid refresh token");

    try {
     
      const payload = verify(refreshToken,serverConfig.REFRESH_TOKEN_SECRET) as JwtPayload;
       
       const { id, email, username } = payload;

const cleanPayload = { id, email, username }; 
      // 3. Generate new tokens
      const newAccessToken = generateAccessToken(cleanPayload);
      console.log(newAccessToken);
      
      const newRefreshToken = generateRefreshToken(cleanPayload);
      console.log(newRefreshToken);
      
      // 4. Save new refresh token in DB
      await this.adminRepository.saveRefreshToken(
        newRefreshToken,
        admin.id,
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      );

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (err) {
      throw new UnauthorisedError("Invalid refresh token");
    }
  }
}


export default AdminService;