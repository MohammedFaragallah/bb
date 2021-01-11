import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticationDto } from 'users/user.dto';
import { AuthService } from 'auth/auth.service';
import { ValidationPipe } from 'pipes/ValidationPipe';

@Controller('authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async authenticate(@Body(new ValidationPipe()) body: AuthenticationDto) {
    return this.authService.authenticate(body);
  }
}
