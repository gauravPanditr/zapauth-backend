import { LogEventDTO } from "../dtos/security-log.dto";
import { Log } from "../model/security-log.model";

interface QueryParams {
  userId?:         string;
  projectId:       string;
  eventCode?:      string;
  page?:           number;
  queryItemCount?: number;
  startDate?:      string;
  endDate?:        string;
}



class SecurityLogService {

  // ── Save a log entry (called internally by auth service) ──────
  async logEvent(dto:LogEventDTO ): Promise<void> {
    try {
      await Log.create(dto);
      console.log(`[LOG] ${dto.event.code} | user:${dto.userId} | success:${dto.event.success}`);
    } catch (err) {
      // Never throw — logging must never crash auth flow
      console.error("[LOG ERROR] Failed to save security log:", err);
    }
  }

  // ── Private helpers ───────────────────────────────────────────
  private buildFilter(params: QueryParams) {
    const filter: Record<string, any> = {};

    if (params.userId)    filter.userId           = params.userId;
    if (params.projectId) filter.projectId        = params.projectId;
    if (params.eventCode) filter["event.code"]    = params.eventCode;

    if (params.startDate || params.endDate) {
      filter.createdAt = {};
      if (params.startDate) filter.createdAt.$gte = new Date(params.startDate);
      if (params.endDate)   filter.createdAt.$lte = new Date(params.endDate);
    }

    return filter;
  }


  private async paginate(filter: object, page: number, limit: number) {
    const [logs, totalCount] = await Promise.all([
      Log.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Log.countDocuments(filter),
    ]);

    return {
      logs,
      totalCount,
      totalPages:  Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }
  async deleleLogs(id:string){
    
    
     return Log.deleteMany({id});
  }

  // ── Query methods (called by controller) ──────────────────────
  async getLogsByUserID(params: QueryParams) {
    const filter = this.buildFilter(params);
    return this.paginate(filter, params.page ?? 1, params.queryItemCount ?? 10);
  }


  async getAllLogsByEvent(params: QueryParams) {
    const filter = this.buildFilter(params);
    return this.paginate(filter, params.page ?? 1, params.queryItemCount ?? 10);
  }

  async getUserLogsByEvent(params: QueryParams) {
    const filter = this.buildFilter(params);
    return this.paginate(filter, params.page ?? 1, params.queryItemCount ?? 10);
  }
}

export const securityLogService = new SecurityLogService();
