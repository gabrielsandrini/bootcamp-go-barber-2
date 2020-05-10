import { Router } from 'express';
import appointmensRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();
routes.use('/appointments', appointmensRouter);
routes.use('/users', usersRouter);

export default routes;
