import { Router } from 'express';
import SessionController from '@modules/users/infra/http/controllers/SessionsController';
import { celebrate, Segments, Joi } from 'celebrate';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionsRouter;
