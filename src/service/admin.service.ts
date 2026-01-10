
import CreateAdminDto from "../dtos/createAdmin.dto";
import LoginAdminDto from "../dtos/loginAdmin.dto";
import AdminRespository from "../repositories/admin.repository"
import bcrypt from "bcrypt-ts"
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
        const admin =await this.adminRepository.loginAdmin(dto);
        return admin;
    }

    async getAdminById(id:string){
        const admin=await this.adminRepository.getAdminById(id);
       return admin;
    }

}


export default AdminService;