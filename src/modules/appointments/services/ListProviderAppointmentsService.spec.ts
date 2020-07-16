import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProvidersAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('Should be able to list appointments on a specific day from a provider', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });

  it('Should to return cached appointments list', async () => {
    const findAllInDayFromProvider = jest.spyOn(
      fakeAppointmentsRepository,
      'findAllInDayFromProvider',
    );

    const appointment = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    // cacheKey = `providers-appointments:${provider_id}:${year}-${month}-${day}`;
    const cacheKey = 'providers-appointments:provider:2020-5-20';

    await fakeCacheProvider.save(cacheKey, appointment);

    await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(findAllInDayFromProvider).toHaveBeenCalledTimes(0);
  });
});
