import { Schema, model, Document, Types } from "mongoose";
import { UserRole } from "./user.js";

export type ActivityType =
  | "login"
  | "search"
  | "click"
  | "review"
  | "session_start"
  | "session_end";

export interface ActivityMetadata {
  button?: string;
  searchTerm?: string;
  duration?: number;
  [key: string]: any;
}

export interface IActivity extends Document {
  userId: Types.ObjectId;
  role: UserRole;
  type: ActivityType;
  metadata: ActivityMetadata;
  timestamp: Date;
}

const ActivitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  role: {
    type: String,
    enum: ["visitor", "requester", "fixer"],
    required: true,
  },
  type: {
    type: String,
    enum: ["login", "search", "click", "review", "session_start", "session_end"],
    required: true,
  },
  metadata: { type: Schema.Types.Mixed, default: {} },
  timestamp: { type: Date, default: Date.now },
});

export const Activity = model<IActivity>("Activity", ActivitySchema);
