import mongoose, { model, Schema, type InferSchemaType } from "mongoose";

const RefreshTokenSchema=new Schema({
  refreshToken:{type:String,required:true,unique:true},
})
export type RefreshToken=InferSchemaType<typeof RefreshTokenSchema>;

export const refreshTokenModel=model<RefreshToken>("RefreshToken",RefreshTokenSchema);