import { prisma } from "../config/dbConfig";
import CreateUserDTO from "../dtos/createUser.dto";
import LoginUserDto from "../dtos/loginUser.dto";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs"

console.log("Hello Navya Ji")

class UserService{
  private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    
   
   
  async createUser(dto: CreateUserDTO, projectId: string, projectKey: string){
    
     const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.projectKey!== projectKey) {
      throw new Error("Invalid project key");
    }

    // Hash password
    dto.password = bcrypt.hashSync(dto.password, 10);

    // Create user
    return this.userRepository.createUser(dto, projectId);
  }
async loginUser(dto: LoginUserDto, projectId: string, projectKey: string){
        const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    if (project.projectKey!== projectKey) {
      throw new Error("Invalid project key");
    }
}

  async getUserById(id:string){
    const userId=await this.userRepository.findUserById(id);
    return userId;
     
  }
}


export default UserService;