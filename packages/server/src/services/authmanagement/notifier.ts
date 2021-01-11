import config from 'config';
import { Types } from 'feathers-authentication-management-ts';
import fs from 'fs';
import Handlebars from 'handlebars';
import { SendMailOptions } from 'nodemailer';
import * as path from 'path';

import { Application } from '../../declarations';

const appPath = path.dirname(require.main?.filename || '');

const templatesPath = path.join(appPath, '..', 'src', 'emails');
const partialTemplatesPath = path.join(templatesPath, 'partials');
const authTemplatesPath = path.join(templatesPath, 'auth');

const partialPath = (partial: string) =>
  path.join(partialTemplatesPath, `${partial}.hbs`);

const registerPartial = (partial: string) => {
  const partialString = fs.readFileSync(partialPath(partial), 'utf8');
  Handlebars.registerPartial(partial, partialString);
};

registerPartial('header');
registerPartial('footer');
registerPartial('logo');
registerPartial('returnEmail');

const logo =
  'https://res.cloudinary.com/frego/image/upload/v1582459106/mini_charles-gaudreault-xXofYCc3hqc-unsplash_arcbbg.jpg';

export const notifier = (app: Application) => {
  const from = config.get('mailer.auth.user');
  const appName = app.get('app');
  const mailSender = `${appName}<${from}>`;

  const sendEmail = async (email: SendMailOptions) => {
    try {
      const { accepted } = await app.service('mailer').create(email);

      accepted.forEach(item => console.log(`Sent email to: ${item}`));
    } catch (err) {
      console.log('Error sending email', err);
    }
  };

  const getLink = (type: string, hash: string) =>
    `${app.get('client')}/${type}?token=${hash}`;

  return (type: Types, user: any) => {
    try {
      const name = user?.userName || user.email;
      const common = { logo, name };

      const getEmail = (subject: string, data?: any): SendMailOptions => {
        const templatePath = (type: string) =>
          path.join(authTemplatesPath, `${type}.hbs`);
        const templateString = fs.readFileSync(templatePath(type), 'utf8');

        const template = Handlebars.compile(templateString);

        return {
          from: mailSender,
          to: user.email,
          subject: subject,
          html: template({
            ...data,
            ...common,
            returnEmail: { email: from, ...data.returnEmail },
          }),
        };
      };

      let tokenLink;

      switch (type) {
        case 'resendVerifySignup':
          tokenLink = getLink('verify', user.verifyToken);

          return sendEmail(
            getEmail('Verify Signup', {
              tokenLink,
              returnEmail: {
                subject: 'I did not sign up at this site',
                body: 'Someone unauthorized signed up with my email.',
              },
            }),
          );

        case 'verifySignup':
          tokenLink = getLink('verify', user.verifyToken);

          return sendEmail(getEmail('Confirm Signup', { tokenLink }));

        case 'sendResetPwd':
          tokenLink = getLink('reset', user.resetToken);

          return sendEmail(
            getEmail('Reset Password', {
              tokenLink,
              returnEmail: {
                subject: 'I did not reset my password',
                body: 'Someone unauthorized sent this reset password request.',
              },
            }),
          );

        case 'resetPwd':
          tokenLink = getLink('reset', user.resetToken);

          return sendEmail(
            getEmail('Your password was reset', {
              tokenLink,
              returnEmail: {
                subject: 'I did not reset my password',
                body: 'Someone unauthorized sent this reset password request.',
              },
            }),
          );

        case 'passwordChange':
          return sendEmail(
            getEmail('Your password was changed', {
              returnEmail: {
                subject: 'I did not change my password',
                body:
                  'Someone unauthorized changed my password. Can you send me a reset link?',
              },
            }),
          );

        case 'identityChange':
          tokenLink = getLink('verifyChanges', user.verifyToken);

          return sendEmail(
            getEmail('Your account was changed.', {
              tokenLink,
              changes: [],
              returnEmail: {
                subject: 'I did not change my information',
                body: `Someone unauthorized changed my information. Can you help me change it back?`,
              },
            }),
          );

        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
};
