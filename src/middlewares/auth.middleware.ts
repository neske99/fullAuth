import express, { type NextFunction, type Request, type Response } from 'express'
import {verifyToken} from '../services/auth.service.ts'
import { UserTokenDTOSchema,type UserTokenDTO } from '../dtos/user/userToken.dto.ts'
import {type Role} from '../constants/roles.ts'

export function authorizeRoles(...requiredRoles:Role[]){

    return function(req:Request,res:Response,next:NextFunction){

        let roles:Role[]=req.body.user.roles;
        if(requiredRoles.some(rr=>roles.includes(rr))){
            next()
        }else{
            res.sendStatus(403);
        }
    }
}

export default function(req:Request,res:Response,next:NextFunction){
    const header=req.headers.authorization;
    if(header ==undefined){
        //console.log(header);
        //console.log("header is undefined");
        res.sendStatus(401);
        return;
    }

    let authParams:string[]|undefined=header?.split(' ')
    if(authParams == undefined || authParams.length<2 || authParams[0]?.toLowerCase()!='bearer' ){
        //console.log(authParams);
        //console.log("Params undefined or length wrong or not bearer");
        res.sendStatus(401);
        return;
    }
    if(typeof authParams[1] =='string' ){
        //console.log(authParams[1])
        const user=verifyToken(authParams[1]);
        if(user==undefined){
            res.sendStatus(403)
            return;
        }
        req.body.user=UserTokenDTOSchema.parse(user);
        console.log(user);

    }else{
        res.sendStatus(401);
        return;
    }
    next();
}