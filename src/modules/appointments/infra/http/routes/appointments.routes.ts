import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/controllers/AppointmentsController';

const appointmensRouter = Router();
const appointmentsController = new AppointmentsController();

appointmensRouter.use(ensureAuthenticated);

/* appointmensRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});
 */
appointmensRouter.post('/', appointmentsController.create);

export default appointmensRouter;
