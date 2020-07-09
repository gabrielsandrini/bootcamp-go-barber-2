import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const providerMonthAvailabilityService = container.resolve(
      ProviderMonthAvailabilityService,
    );

    const avaliability = await providerMonthAvailabilityService.execute({
      month,
      year,
      provider_id,
    });

    return response.json(avaliability);
  }
}

export default ProviderMonthAvailabilityController;
