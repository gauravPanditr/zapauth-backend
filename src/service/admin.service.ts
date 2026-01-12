
import CreateAdminDto from "../dtos/createAdmin.dto";
import LoginAdminDto from "../dtos/loginAdmin.dto";
import NotFoundError from "../errors/notfound.error";
import UnauthorisedError from "../errors/unauthorisedError";
import AdminRespository from "../repositories/admin.repository"
import bcrypt from "bcrypt-ts"
import { generateJWT } from "../utils/auth.utils";
import { Admins } from "../../generated/prisma/client";
class AdminService{

    private adminRepository :AdminRespository
    constructor( adminRepository:AdminRespository){
        this.adminRepository=adminRepository;
    }
    
    async createAdmin(dto :CreateAdminDto){
        dto.password=bcrypt.hashSync(dto.password);
        const admin= await this.adminRepository.createAdmin(dto);
        return admin;

    }

    async loginAdmin(dto:LoginAdminDto){
        try{
        const admin =await this.adminRepository.getAdminByEmail(dto.email);
          if(!admin) {
                throw new NotFoundError( 'email', dto.email);

            }
             const doesPasswordMatch = bcrypt.compareSync(dto.password, admin.password);
             if(!doesPasswordMatch) {
                throw new UnauthorisedError();
            }

             const jwt = generateJWT({id: admin.id, email: admin.email, username: admin.username});
            return jwt;
    }catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getAdminById(id:string):Promise<Admins>{
         try {
            const response : Admins | null = await this.adminRepository.getAdminById(id);
            if(!response) {
                throw {error: "Not found"}
            }
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

}


export default AdminService;