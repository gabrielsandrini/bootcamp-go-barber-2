import { Router } from 'express';
import SessionController from '@modules/users/controllers/SessionsController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
