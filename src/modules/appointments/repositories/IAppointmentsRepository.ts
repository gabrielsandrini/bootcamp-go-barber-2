import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateappointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateappointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
