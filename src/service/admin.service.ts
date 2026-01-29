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

    async deleteAccount(adminId: string) {
    // Check if admin exists (optional, for error handling)
    const admin = await this.adminRepository.deleteAdmin(adminId);
    if (!admin) {
      throw new Error('Admin not found');
    }

    
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
    

async refreshAccessToken(refreshToken: string) {
  if (!refreshToken) throw new UnauthorisedError("Refresh token missing");

  // 1. Verify refresh token (no need to generate a new one)
  let payload: JwtPayload;
  try {
    payload = verify(refreshToken, serverConfig.REFRESH_TOKEN_SECRET) as JwtPayload;
  } catch (err) {
    throw new UnauthorisedError("Invalid refresh token");
  }

  // 2. Extract admin info
  const { id, email, username } = payload;
  const cleanPayload = { id, email, username };

  // 3. Generate only a new access token
  const newAccessToken = generateAccessToken(cleanPayload);

  return { accessToken: newAccessToken };
}
async deleteLoginSession(adminId: string) {
  try {
    const admin = await this.adminRepository.deleteTokens(adminId);
    if (!admin) {
      throw new UnauthorisedError("Admin not found");
    }
  } catch (err) {
    throw err; // or wrap in custom error
  }
}
}


export default AdminService;