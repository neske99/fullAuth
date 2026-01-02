import express from 'express'
import authmiddleware from '../middlewares/authmiddleware.ts';
import { sign } from '../services/auth.service.ts';

const router=express.Router();

router.get('/login',(req,res,next)=>{
  res.send("This is a call to login")
});
router.get('/logout',(req,res,next)=>{
  res.send("This is a call to logout")
});
router.get('/signup',(req,res,next)=>{
  res.send("This is a call to signup")
});
router.get('/refresh',(req,res,next)=>{
  res.send("This is a call to refresh")
});

router.get('/sign',(req,res,next)=>{
  res.send(sign("12345"));
});

router.get('/validateToken',authmiddleware,(req,res,next)=>{
  res.sendStatus(200);
});

export default router;