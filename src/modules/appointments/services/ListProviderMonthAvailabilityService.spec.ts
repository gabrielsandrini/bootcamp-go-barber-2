import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the month avilability from provider', async () => {
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    await Promise.all([
      hours.map(hour =>
        fakeAppointmentsRepository.create({
          provider_id: 'user',
          date: new Date(2020, 4, 20, hour, 0, 0),
        }),
      ),
    ]);

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, avaliable: true },
        { day: 20, avaliable: false },
        { day: 21, avaliable: true },
        { day: 22, avaliable: true },
      ]),
    );
  });
});
