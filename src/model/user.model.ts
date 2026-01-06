import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcrypt-ts";

export interface IUser {
  username: string;
  email: string;
  password: string;
  project: Types.ObjectId; // reference to Project
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {
  validatePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

// Hash password before save
UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Validate password
UserSchema.methods.validatePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User = model<IUserDocument>("User", UserSchema);
