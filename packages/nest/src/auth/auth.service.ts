import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtModuleOptions } from '@nestjs/jwt';
import * as config from 'config';

import { AuthenticationDto } from 'users/user.dto';
import { UsersService } from 'users/users.service';

const { signOptions } = config.get<JwtModuleOptions>('jwt');

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthenticationDto) {
    const user = await this.userService.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async authenticate(user: AuthenticationDto) {
    const valid = await this.validateUser(user);

    return valid
      ? {
          user: valid,
          access_token: this.jwtService.sign({ sub: valid.id }, signOptions),
        }
      : new UnauthorizedException();
  }
}
