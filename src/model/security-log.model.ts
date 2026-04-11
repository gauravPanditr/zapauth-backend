import { Schema, model, Model, Document } from "mongoose";
import { EventCode } from "../types/event_code";
// ─── Interface ────────────────────────────────────────────────────
export interface ISecurityLog extends Document {
  userId:    string;   // Prisma user ID (string, not ObjectId)
  projectId: string;   // Prisma project ID
  sessionId?: string;  // Prisma session ID

  event: {
    code:    EventCode;
    success: boolean;
  };

  message?: string;

  meta?: {
    ip?:        string;
    userAgent?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

export interface ISecurityLogModel extends Model<ISecurityLog> {}

// ─── Schema ───────────────────────────────────────────────────────
const SecurityLogSchema = new Schema<ISecurityLog, ISecurityLogModel>(
  {
    userId:    { type: String, required: true },
    projectId: { type: String, required: true },
    sessionId: { type: String, required: false },

    event: {
      code:    { type: String, enum: Object.values(EventCode), required: true },
      success: { type: Boolean, required: true, default: true },
    },

    message: { type: String, required: false },

    meta: {
      ip:        { type: String },
      userAgent: { type: String },
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

// ─── Indexes ──────────────────────────────────────────────────────
SecurityLogSchema.index({ userId: 1, projectId: 1 });
SecurityLogSchema.index({ "event.code": 1, projectId: 1 });
SecurityLogSchema.index({ createdAt: -1 });

export const Log = model<ISecurityLog, ISecurityLogModel>("Log", SecurityLogSchema);