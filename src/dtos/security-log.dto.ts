import { EventCode } from "../types/event_code";


export interface SecurityLogDTO {
  userId: string;
  projectId: string;
  sessionId?: string;

  event: {
    code: EventCode;
    success: boolean;
  };

  message?: string;

  meta?: {
    ip?: string;
    userAgent?: string;
  };
}
