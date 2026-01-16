import CreateUserDTO from "../dtos/createUser.dto";
import ProjectRespository from "../repositories/project.repository";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs"

const projectRespository=new ProjectRespository();

class UserService{
  private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    
    
   
  async createUser(dto: CreateUserDTO, projectId: string, projectKey: string){
    
     const project = await projectRespository.getProjectById(projectId);

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
 async findByEmail(
    email: string,
    projectId: string
  ){
     const user = await this.userRepository.findByEmail(email, projectId);
if (!user) throw new Error("Invalid credentials");
 return user;

  }

  async getUserById(id:string){
    const userId=await this.userRepository.findUserById(id);
    return userId;
     
  }
}


export default UserService;