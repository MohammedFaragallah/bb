import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from '@feathersjs/feathers';
import { Transporter, createTransport, SendMailOptions } from 'nodemailer';

interface IMailer<T = SendMailOptions> {
  create: ServiceMethods<T>['create'];
}

export class Mailer implements IMailer {
  transporter: Transporter;

  constructor(...args: Parameters<typeof createTransport>) {
    this.transporter = createTransport(...args);
  }

  create(...args: Parameters<Transporter['sendMail']>) {
    const body = args[0];

    return this.transporter.sendMail(body);
  }
}
