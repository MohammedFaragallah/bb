import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';

import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { JwtStrategy } from 'auth/jwt.strategy';
import { LocalStrategy } from 'auth/local.strategy';
import { UsersModule } from 'users/users.module';

const jwt = config.get<JwtModuleOptions>('jwt');

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register(jwt)],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
