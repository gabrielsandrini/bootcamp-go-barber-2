import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('it should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndo@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndo@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });
});
