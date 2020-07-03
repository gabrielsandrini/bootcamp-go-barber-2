import { getRepository, Repository, Between } from 'typeorm';
import { startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const dateInMonthAndYear = new Date(year, month - 1, 1);

    const findAppointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Between(
          startOfMonth(dateInMonthAndYear),
          endOfMonth(dateInMonthAndYear),
        ),
      },
    });

    return findAppointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const dateInDay = new Date(year, month - 1, day);

    const findAppointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Between(startOfDay(dateInDay), endOfDay(dateInDay)),
      },
    });

    return findAppointments;
  }
}

export default AppointmentsRepository;
