import express from 'express'

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

export default router;