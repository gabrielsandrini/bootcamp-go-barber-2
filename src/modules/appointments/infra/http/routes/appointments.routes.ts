import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmensRouter = Router();

appointmensRouter.use(ensureAuthenticated);

/* appointmensRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});
 */
appointmensRouter.post('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();

  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointments = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointments.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmensRouter;
