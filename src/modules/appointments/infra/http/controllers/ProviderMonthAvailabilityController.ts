import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const providerMonthAvailabilityService = container.resolve(
      ProviderMonthAvailabilityService,
    );

    const availability = await providerMonthAvailabilityService.execute({
      month: Number(month),
      year: Number(year),
      provider_id,
    });

    return response.json(availability);
  }
}

export default ProviderMonthAvailabilityController;
