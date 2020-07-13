import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createAppointments = container.resolve(CreateAppointmentService);

    const appointment = await createAppointments.execute({
      provider_id,
      user_id,
      date,
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
