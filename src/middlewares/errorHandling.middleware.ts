import type {  NextFunction, Request, RequestHandler, Response } from "express";
import logger from '../logging/logger.ts'

export default function(err:Error,req:Request,res:Response,next:NextFunction){

  if(!res.headersSent){
    if(err){
      logger.error('####')
      logger.error(req.body)
      logger.error('####')
      logger.error(err.message)
      logger.error('####')
      logger.error(err.stack)
      logger.error('####')
      res.sendStatus(500);
    }else{
      next()
    }

  }

}