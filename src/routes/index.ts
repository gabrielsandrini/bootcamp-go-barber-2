import { Router } from 'express';
import appointmensRouter from './appointments.routes';

const routes = Router();
routes.use('/appointments', appointmensRouter);

export default routes;
