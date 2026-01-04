import type {  NextFunction, Request, RequestHandler, Response } from "express";

export default function(err:Error,req:Request,res:Response,next:NextFunction){

  if(!res.headersSent){
    if(err){
      console.log(req.body)
      res.sendStatus(500);
    }else{
      next()
    }

  }

}