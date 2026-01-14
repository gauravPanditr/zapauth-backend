
import CreateUserDTO from "../dtos/createUser.dto";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs"


class UserService{
  private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

  async createUser(dto : CreateUserDTO){
      dto.password=bcrypt.hashSync(dto.password);
      const user=await this.userRepository.createUser(dto);
      return user;
  }
   
}


export default UserService;