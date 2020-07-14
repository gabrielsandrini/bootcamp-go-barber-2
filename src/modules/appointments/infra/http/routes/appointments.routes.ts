import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmensRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmensRouter.use(ensureAuthenticated);

appointmensRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);

appointmensRouter.get('/me', providerAppointmentsController.index);

export default appointmensRouter;
