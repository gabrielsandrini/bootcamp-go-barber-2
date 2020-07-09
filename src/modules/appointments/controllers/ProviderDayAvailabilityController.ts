import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const avaliability = await listProviderDayAvailabilityService.execute({
      day,
      month,
      year,
      provider_id,
    });

    return response.json(avaliability);
  }
}

export default ProviderDayAvailabilityController;
