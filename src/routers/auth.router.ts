import express from 'express'
import authMiddleware from '../middlewares/auth.middleware.ts';
import { login,registerBasicUser,refreshToken, logout} from '../services/auth.service.ts';

const router=express.Router();

// router.get('/login',(req,res,next)=>{
//   throw new Error("Dzoni Test error")
//   res.send("This is a call to login")
// });
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

router.post('/login',async (req,res,next)=>{
  let username:string=req.body.username;
  let password:string=req.body.password;
  let refreshAndAccessTokens=await login(username,password)
  console.log(refreshAndAccessTokens);
  if(refreshAndAccessTokens==undefined)
    res.send("Login failed for credentials");
  else
    res.send(refreshAndAccessTokens);
});

router.post('/refresh',async (req,res,next)=>{
  const oldRefreshToken=req.body.refreshToken;
  const result= await refreshToken(oldRefreshToken);
  if(result==undefined)
    res.send("Bad token")
  res.send(result)
});

router.get('/logout',async (req,res,next)=>{
  const success=await logout(req.body.refreshToken);
  res.send(success);
});


router.get('/validateToken',authMiddleware,(req,res,next)=>{
  console.log(req.body);
  res.send(req.body.user);
});

export default router;