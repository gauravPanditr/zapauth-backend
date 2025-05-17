import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { model } from "mongoose";
import { IUser, IUserModel, IUserMethods } from "../types/model-types.ts/user-types";
const UserSchema = new Schema<IUser, IUserModel, IUserMethods>({
   
      projectId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:"Project"
      },
      username: {
            type: String,
            
            trim: true,
            
            lowercase: true,
      },
      email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
      },
      password: {
            type: String,
           
      },
      isVerified: {
            type: Boolean,
            default: false,
      },
      token:String,
      tokenExpiry:Date,
},{   timestamps:true,validateBeforeSave:true}
);

UserSchema.pre("save", async function () {
      if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
      }
});
UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
}
export const User = model<IUser, IUserModel, {}>("User", UserSchema);