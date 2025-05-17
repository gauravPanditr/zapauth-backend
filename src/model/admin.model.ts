
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IAdmin, IAdminModel, IAdminMethods } from "../types/model-types.ts/admin.types";
import { model } from "mongoose";
const AdminSchema=new Schema<IAdmin, IAdminModel, IAdminMethods>({
      name:{
            type:String,
            required:true,
            trim:true
      },
      email:{
            type:String,
            required:true,
            unique:true,
            trim:true
      },
      password:{
            type:String,
            required:true,
            trim:true
      },
      accessToken:String,
      accessTokenExpiry:Date,
      refreshToken:String,
      refreshTokenExpiry:Date
},{
      timestamps:true,validateBeforeSave:true
});
AdminSchema.pre("save",async function(){
      if(this.isModified("password")){
            this.password=await bcrypt.hash(this.password,10);
      }
     

});
AdminSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
export const AdminModel = model<IAdmin, IAdminModel>("Admin", AdminSchema);