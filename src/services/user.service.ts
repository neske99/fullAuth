import {userModel} from '../models/user.model.ts'
import type {User} from '../models/user.model.ts'
import {Role} from '../constants/roles.ts'

const setUserRoles=async function(username:string,roles:Role[]){
  console.log(username,roles)
  if(roles.includes(Role.Admin))
    return null
  const user:User | null= await userModel.findOne({username:username}).exec();
  if(user==null){
    return false;
  }

  if((user.roles.includes(Role.Admin) && user.username!=username) )
    return false;
  else{
    let result=await userModel.updateOne({username:username},{roles:roles}).exec();
    console.log(result);
    return result.acknowledged && result.matchedCount>0;
  }
}

const setUserIsActive=async function(username:string,isActive:boolean){
  const user:User | null= await userModel.findOne({username:username}).exec();
  if(user==null){
    return false;
  }

  let result=await userModel.updateOne({username:username},{isActive:isActive}).exec();
  return result.acknowledged && result.matchedCount>0;
}
export {setUserRoles,setUserIsActive}