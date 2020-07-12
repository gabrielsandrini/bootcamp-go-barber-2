import { ObjectId } from 'mongodb';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../../infra/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationsDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectId(), recipient_id, content });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
