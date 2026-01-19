import CreateUserDTO from "../dtos/createUser.dto";

import UserRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs"


class UserService{
  private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    
    
   
  async createUser(dto: CreateUserDTO){
    dto.password = bcrypt.hashSync(dto.password, 10);

    return this.userRepository.createUser(dto);
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