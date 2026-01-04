import mongoose, { model, Schema, type InferSchemaType } from "mongoose";

const UserSchema=new Schema({
  username:{type:String,required:true,unique:true},
  password:{type:String,required:true}

})
export type User=InferSchemaType<typeof UserSchema>;

export const userModel=model<User>("User",UserSchema);