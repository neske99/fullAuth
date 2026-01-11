
import express from 'express'
import authMiddleware, { authorizeRoles } from '../middlewares/auth.middleware.ts';
import { Role } from '../constants/roles.ts';

const router=express.Router();

router.post('setUserRoles',authMiddleware,authorizeRoles(Role.Admin),function(req,res,next){
  res.sendStatus(200);
});


export default router;