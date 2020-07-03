import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the day availability from provider', async () => {
    const hours = [8, 11, 12, 17];
    await Promise.all([
      hours.map(hour =>
        fakeAppointmentsRepository.create({
          provider_id: 'user',
          date: new Date(2020, 4, 20, hour, 0, 0),
        }),
      ),
    ]);

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, avaliable: false },
        { hour: 9, avaliable: true },
        { hour: 10, avaliable: true },
        { hour: 11, avaliable: false },
        { hour: 12, avaliable: false },
        { hour: 17, avaliable: false },
      ]),
    );
  });
});
