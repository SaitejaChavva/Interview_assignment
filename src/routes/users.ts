import { Router } from 'express';
import * as Users from '../users/controller'
import * as Validators from '../users/validator'
import * as Authentication from '../configs/authentication'

const userRouter = Router();

userRouter.post('/login', Validators.validateLogin, async (req, res) => {
    const responseObj = await Users.login(req, res);
    return res.send(responseObj);
});

export default userRouter;