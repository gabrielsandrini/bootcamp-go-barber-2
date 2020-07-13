import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ email, name, password });

    return response.json(classToClass(user));
  }
}

export default UserController;
