import { Schema, model, Document } from "mongoose";
export type UserRole = "fixer" | "requester" | "visitor";
export type UserLanguage = "es" | "en";

export interface IUser extends Document {
  name: string;
  email?: string;
  passwordHash?: string;
  role: UserRole;
  language: UserLanguage;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: false, sparse: true },
  passwordHash: { type: String },
  role: {
    type: String,
    enum: ["fixer", "requester", "visitor"],
    default: "visitor",
  },
  language: {
    type: String,
    enum: ["es", "en"],
    default: "es",
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = model<IUser>("User", UserSchema);
