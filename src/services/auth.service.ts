import jsonwebtoken from 'jsonwebtoken'
import mongoose from 'mongoose';
import { userModel,type User} from '../models/user.model.ts'
import type { StringValue } from 'ms';
import {type RefreshToken,refreshTokenModel} from '../models/refreshToken.model.ts'



function generateAccessToken(user: User ){
    const secretKey=process.env.SECRET_ACCESS_KEY;
    let expiresIn=process.env.ACCESS_TOKEN_EXPIRES_IN;
    if(secretKey==undefined || expiresIn==undefined)
        throw new Error("SECRET_ACCESS_KEY is undefined")
    let userDTO={username:user.username,roles:user.roles};

    return jsonwebtoken.sign(userDTO, secretKey,{expiresIn:expiresIn as StringValue})
}

function generateRefreshToken(user: User ){
    const secretKey=process.env.SECRET_REFRESH_KEY;
    let expiresIn=process.env.REFRESH_TOKEN_EXPIRES_IN;
    if(secretKey==undefined || expiresIn==undefined)
        throw new Error("SECRET_REFRESH_SECRET is undefined or TOKEN EXPIRY not set")
    let userDTO={username:user.username,roles:user.roles};

    return jsonwebtoken.sign(userDTO, secretKey,{expiresIn:expiresIn as StringValue})
}

function verifyToken(token:string){
    const secretKey=process.env.SECRET_ACCESS_KEY;
    if(secretKey==undefined)
        throw new Error("SECRET_ACCESS_KEY is undefined")

      try{
        const decoded=jsonwebtoken.verify(token,secretKey);
        return decoded;
      }catch(err){
        return undefined;
      }
}

async function login(username:string,password:string){

  const user=await userModel.findOne({username}).exec();
  if(user ==undefined || user.password!=password){
    return undefined;
  }
  const accessToken=generateAccessToken(user);
  const refreshToken=generateRefreshToken(user);
  refreshTokenModel.create({refreshToken:refreshToken,})

  return {accessToken:accessToken,refreshToken:refreshToken};
}

async function registerBasicUser(username:string,password:string){
  return (await userModel.create({username,password,roles:["BasicUser"]})) as User;
}

async function refreshToken(refreshToken:string){
 const secretKey=process.env.SECRET_REFRESH_KEY;
 let expiresIn=process.env.REFRESH_TOKEN_EXPIRES_IN;
 if(secretKey==undefined || expiresIn==undefined)
    throw new Error("SECRET_REFRESH_SECRET is undefined or TOKEN EXPIRY not set")

 try{
    let userDetails=await jsonwebtoken.verify(refreshToken,secretKey) as User;
    await refreshTokenModel.deleteOne({refreshToken:refreshToken}).exec();
    const user=await userModel.findOne({username:userDetails.username}).exec();
    if(user==undefined)
      return undefined;



    const newAccessToken=generateAccessToken(user);
    const newRefreshToken=generateRefreshToken(user);

    refreshTokenModel.create({refreshToken:newRefreshToken,})

    let result={accessToken:newAccessToken,refreshToken:newRefreshToken};
    return result;
 }catch(err){
    return undefined;
 }
}

async function logout(refreshToken:string){
  let result=await refreshTokenModel.deleteOne({refreshToken:refreshToken}).exec();
  if( result.acknowledged && result.deletedCount>0)
    return true;
  return false;
}





export {registerBasicUser,verifyToken,login,refreshToken,logout}