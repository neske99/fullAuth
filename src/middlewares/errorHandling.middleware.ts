import type {  NextFunction, Request, RequestHandler, Response } from "express";

export default function(err:Error,req:Request,res:Response,next:NextFunction){

  if(!res.headersSent){
    if(err){
      console.log('####')
      console.log(req.body)
      console.log('####')
      console.log(err.message)
      console.log('####')
      console.log(err.stack)
      console.log('####')
      res.sendStatus(500);
    }else{
      next()
    }

  }

}