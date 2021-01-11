import axios from 'axios';
import { OAuthStrategy } from '@feathersjs/authentication-oauth';
import { Params } from '@feathersjs/feathers';
import app from '../../app';

export class FacebookStrategy extends OAuthStrategy {
  async getProfile(authResult: any) {
    // This is the oAuth access token that can be used
    // for Facebook API requests as the Bearer token
    const accessToken = authResult.access_token;

    const { data } = await axios.get('https://graph.facebook.com/me', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        fields: 'id,name,email,picture',
      },
    });

    return data;
  }

  async getEntityData(profile: any, params?: Params): Promise<any> {
    const baseData = await super.getEntityData(profile, null, {});

    return {
      ...baseData,
      userName: profile.name,
      profileImage: profile.picture,
      email: profile.email,
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
