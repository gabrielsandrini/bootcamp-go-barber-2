import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute({ user_id });

    return response.json(providers);
  }
}

export default ProvidersController;
