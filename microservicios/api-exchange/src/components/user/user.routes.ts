import { Router } from 'express';
import { findAll, findOne } from './user.controller';

const userRouter = Router();

userRouter.get('/', findAll);
userRouter.get('/:_id', findOne);

export default userRouter;
