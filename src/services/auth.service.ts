import jsonwebtoken from 'jsonwebtoken'
import mongoose from 'mongoose';
import { userModel,type User} from '../models/user.model.ts'
import type { StringValue } from 'ms';
import {type RefreshToken,refreshTokenModel} from '../models/refreshToken.model.ts'
import bcrypt from 'bcrypt'
import crypto from 'crypto'



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
  if(user ==undefined || !(await bcrypt.compare(password,user.password))){
    return undefined;
  }
  const accessToken=generateAccessToken(user);
  const refreshToken=generateRefreshToken(user);

  const refreshTokenHash=crypto.createHash('sha256').update(refreshToken).digest('hex');
  refreshTokenModel.create({refreshToken:refreshTokenHash})

  return {accessToken:accessToken,refreshToken:refreshToken};
}

async function registerBasicUser(username:string,password:string){
  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(password,salt);
  return (await userModel.create({username,password:hashedPassword,roles:["BasicUser"]})) as User;
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

    const refreshTokenHash=crypto.createHash('sha256').update(newRefreshToken).digest('hex');


    refreshTokenModel.create({refreshToken:refreshTokenHash})

    let result={accessToken:newAccessToken,refreshToken:newRefreshToken};
    return result;
 }catch(err){
    return undefined;
 }
}

async function logout(refreshToken:string){

  const refreshTokenHash=crypto.createHash('sha256').update(refreshToken).digest('hex');
  let result=await refreshTokenModel.deleteOne({refreshToken:refreshTokenHash}).exec();
  if( result.acknowledged && result.deletedCount>0)
    return true;
  return false;
}





export {registerBasicUser,verifyToken,login,refreshToken,logout}