import {userModel} from '../models/user.model.ts'
import type {User} from '../models/user.model.ts'
import {Role} from '../constants/roles.ts'
/*
const setUserRoles=async function(username:string,roles:Role[]){
  if(roles.includes(Role.Admin))
    return null
  const user= await userModel.findOne({username:username}).exec();
  if(user==null){
    return null;
  }
  if(user.roles.includes(Role.Admin))
    return null
  else{
    let res= await user.updateOne({roles:roles}).exec();
  }
}
  */

//export {setUserRoles}