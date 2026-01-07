import mongoose, { model, Schema, type InferSchemaType } from "mongoose";

const RefreshTokenSchema=new Schema({
  refreshToken:{type:String,required:true,unique:true},
  createdAt:{
    type:Date,
    default:Date.now,
    expires:process.env.REFRESH_TOKEN_EXPIRES_IN
  }
})
export type RefreshToken=InferSchemaType<typeof RefreshTokenSchema>;

export const refreshTokenModel=model<RefreshToken>("RefreshToken",RefreshTokenSchema);