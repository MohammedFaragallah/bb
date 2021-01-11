import { OAuthStrategy } from '@feathersjs/authentication-oauth';
import { Params } from '@feathersjs/feathers';
import app from '../../app';

export class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile: any, existing: any, params: any) {
    const baseData = await super.getEntityData(profile, existing, params);

    return {
      ...baseData,
      email: profile.email,
      userName: profile.name,
      preferredLanguage: profile.locale,
      profileImage: { secure_url: profile.picture },
    };
  }

  async getRedirect(data: any, params?: Params): Promise<string> {
    if (Object.getPrototypeOf(data) === Error.prototype) {
      const err = data.message as string;
      return app.get('client') + '/callback' + `?error=${err}`;
    } else {
      const token = data.accessToken as string;
      return app.get('client') + '/callback' + `?token=${token}`;
    }
  }
}
