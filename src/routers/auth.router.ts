import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.ts';
import { sign ,login,registerBasicUser} from '../services/auth.service.ts';

const router=express.Router();

// router.get('/login',(req,res,next)=>{
//   throw new Error("Dzoni Test error")
//   res.send("This is a call to login")
// });
router.get('/logout',(req,res,next)=>{
  res.send("This is a call to logout")
});
router.post('/signup',async (req,res,next)=>{
  let username:string=req.body.username;
  let password:string=req.body.password;
  try{
    let user=await registerBasicUser(username,password);
    res.send(user)
  }catch(err){
    res.send("User already exists")
  }
});
router.get('/refresh',(req,res,next)=>{
  res.send("This is a call to refresh")
});

router.post('/login',async (req,res,next)=>{
  let username:string=req.body.username;
  let password:string=req.body.password;
  let signedUser=await login(username,password)
  console.log(signedUser);
  if(signedUser==undefined)
    res.send("Login failed for credentials");
  else
    res.send(signedUser);
});

router.get('/validateToken',authMiddleware,(req,res,next)=>{
  console.log(req.body);
  res.send(req.body.user);
});

export default router;