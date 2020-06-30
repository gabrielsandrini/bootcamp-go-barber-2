import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}
@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    user.name = name;

    if (user.email !== email) {
      // Check if there is an user already using the e-mail
      const userWithUpdatedEmail = await this.usersRepository.findByEmail(
        email,
      );

      if (userWithUpdatedEmail) {
        throw new AppError('E-mail already in use');
      }

      user.email = email;
    }

    if (password && !old_password) {
      throw new AppError('The old password is required to set a new password');
    }

    if (password && old_password) {
      const isOldPasswordCorrect = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!isOldPasswordCorrect) {
        throw new AppError('Old password is not valid');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}
export default UpdateUserProfileService;
