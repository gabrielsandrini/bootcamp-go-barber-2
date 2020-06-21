import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repository/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      // Delete previous avatar
      const userAvatarFilePatch = path.join(
        uploadConfig.directory,
        user.avatar,
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePatch);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePatch);
      }
    }

    user.avatar = avatarFilename;
    await this.usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
