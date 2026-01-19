import CreateUserDTO from "../dtos/createUser.dto";

import UserRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs"
import {EmailService}  from "./email.service";
import { generateOTP } from "../utils/otp.util";


class UserService{
  private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
     

async createUser(dto: CreateUserDTO){
    dto.password = bcrypt.hashSync(dto.password, 10);

    return this.userRepository.createUser(dto);
  }
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    return user;
  }

 async forgotPassword(data: {
    email: string;
    projectId: string;
    baseUrl: string;
  }) {
    const user = await this.userRepository.findByEmailAndProject(
      data.email,
      data.projectId
    );

    if (!user) return; // security

    const token = generateOTP();
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    await this.userRepository.update(user.id, {
      token,
      tokenExpiry: expiry,
    });

    const resetLink = `${data.baseUrl}?token=${token}`;

    const emailService = new EmailService(user.project);
    await emailService.sendResetPasswordEmail(user.email, resetLink);
  }

  async resetPassword(data: {
    token: string;
    newPassword: string;
    projectId: string;
  }) {
    const user = await this.userRepository.findByTokenAndProject(
      data.token,
      data.projectId
    );

    if (!user || !user.tokenExpiry || user.tokenExpiry < new Date()) {
      throw new Error("Invalid or expired token");
    }

    const hashed = bcrypt.hashSync(data.newPassword);

    await this.userRepository.update(user.id, {
      password: hashed,
      token: null,
      tokenExpiry: null,
    });
  }

}


export default UserService;