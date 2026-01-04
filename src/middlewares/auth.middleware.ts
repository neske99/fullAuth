import express, { type NextFunction, type Request, type Response } from 'express'
import {verifyToken} from '../services/auth.service.ts'

export default async function(req:Request,res:Response,next:NextFunction){
    const header=req.headers.authorization;
    if(header ==undefined){
        console.log(header);
        console.log("header is undefined");
        res.sendStatus(401);
        return;
    }

    let authParams:string[]|undefined=header?.split(' ')
    if(authParams == undefined || authParams.length<2 || authParams[0]?.toLowerCase()!='bearer' ){
        console.log(authParams);
        console.log("Params undefined or length wrong or not bearer");
        res.sendStatus(401);
        return;
    }
    if(typeof authParams[1] =='string' ){
        console.log(authParams[1])
        const user=verifyToken(authParams[1]);
        if(user==undefined){
            res.sendStatus(403)
            return;
        }
        req.user=user;

    }else{
        res.sendStatus(401);
        return;
    }
    next();
}