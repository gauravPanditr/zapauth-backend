import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";


export interface IAdmin {
  name: string;
  email: string;
  password: string;
  validatePassword(password: string): Promise<boolean>;
}

// Mongoose schema
const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Pre-save middleware: hash password if modified
AdminSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Instance method: validate password
AdminSchema.methods.validatePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Export model
export const Admin = model<IAdmin>("Admin", AdminSchema);
