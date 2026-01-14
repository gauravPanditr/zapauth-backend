
import { prisma } from "../config/dbConfig";
import CreateUserDTO from "../dtos/createUser.dto";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs"


class UserService{
  private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    

  async createUser(dto : CreateUserDTO){
     const projectId= await prisma.project.findUnique({
        where:{id:dto.projectId},
        select:{id:true}
     })
     if (!projectId) {
      throw new Error("Project not found");
    }
      dto.password=bcrypt.hashSync(dto.password);
      const user=await this.userRepository.createUser(dto);
      return user;
  }
  
}


export default UserService;