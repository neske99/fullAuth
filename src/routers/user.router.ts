
import express from 'express'
import authMiddleware, { authorizeRoles } from '../middlewares/auth.middleware.ts';
import { Role } from '../constants/roles.ts';
import { setUserRoles } from '../services/user.service.ts';

const router=express.Router();

router.post('/setUserRoles',authMiddleware,authorizeRoles(Role.Admin),async function(req,res,next){
  res.send(await setUserRoles(req.body.username,req.body.roles));
});




export default router;