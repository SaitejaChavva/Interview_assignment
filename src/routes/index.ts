import { Router } from 'express';
import contactRouter from './contacts';
import userRouter from './users';
//  import * as ItemService from "./items.service";
 const routes = Router();

routes.use('/contacts', contactRouter);
routes.use('/user', userRouter);

export default routes;