import SessionRepository from "../repositories/session.repository";
import { CreateSessionDTO } from "../dtos/sessionUser.dto";

class SessionService {
  constructor(private repo: SessionRepository) {}

  async create(dto: CreateSessionDTO) {
    await this.repo.deleteExpired(dto.userId);
    return this.repo.create(dto);
  }

  async getByRefreshToken(token: string) {
    return this.repo.findByRefreshToken(token);
  }

  async invalidate(sessionId: string) {
    return this.repo.deleteById(sessionId);
  }
}

export default SessionService;
