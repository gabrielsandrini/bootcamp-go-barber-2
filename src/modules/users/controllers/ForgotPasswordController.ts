import { container } from 'tsyringe';

import { Request, Response } from 'express';
import SendForgotPasswordEmail from '@modules/users/services/SendForgotPasswordEmailService';

class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmail);

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}

export default SessionController;
