import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
