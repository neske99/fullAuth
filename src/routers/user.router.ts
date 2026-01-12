
import express from 'express'
import authMiddleware, { authorizeRoles } from '../middlewares/auth.middleware.ts';
import { Role } from '../constants/roles.ts';
import { setUserIsActive, setUserRoles } from '../services/user.service.ts';

const router=express.Router();

router.post('/setUserRoles',authMiddleware,authorizeRoles(Role.Admin),async function(req,res,next){
  res.send(await setUserRoles(req.body.username,req.body.roles));
});

router.post('/setUserIsActive',authMiddleware,authorizeRoles(Role.Admin),async function(req,res,next){
  res.send(await setUserIsActive(req.body.username,req.body.isActive));
});





export default router;