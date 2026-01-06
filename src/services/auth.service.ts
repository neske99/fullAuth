import jsonwebtoken from 'jsonwebtoken'
import mongoose from 'mongoose';
import { userModel,type User} from '../models/user.model.ts'
import type { StringValue } from 'ms';



function sign(user: User ){
    const secretKey=process.env.SECRET_ACCESS_KEY;
    let expiresIn=process.env.ACCESS_TOKEN_EXPIRESIN;
    if(secretKey==undefined || expiresIn==undefined)
        throw new Error("SECRET_ACCESS_KEY is undefined")
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
  if(user ==undefined){
    return undefined;
  }
  return sign(user);
}

async function registerBasicUser(username:string,password:string){
  return (await userModel.create({username,password,roles:["BasicUser"]})) as User;
}





export {sign,registerBasicUser,verifyToken,login}