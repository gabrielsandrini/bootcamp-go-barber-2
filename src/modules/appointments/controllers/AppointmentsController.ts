import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointments = container.resolve(CreateAppointmentService);

    const appointment = await createAppointments.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
