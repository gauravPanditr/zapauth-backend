import { logger } from "../config/logger";
import { SecurityLogDTO } from "../dtos/security-log.dto";


class SecurityLogService {

  async logEvent(dto: SecurityLogDTO) {

    logger.info(dto.event.code, {
      userId: dto.userId,
      projectId: dto.projectId,
      sessionId: dto.sessionId,

      event: {
        code: dto.event.code,
        success: dto.event.success,
      },

      message: dto.message,

      meta: {
        ip: dto.meta?.ip,
        userAgent: dto.meta?.userAgent,
      },
    });

  }
}

export const securityLogService = new SecurityLogService();
