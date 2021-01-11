import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { CreateUserDto } from 'users/user.dto';
import { User } from 'users/users.entity';
import { UsersService } from 'users/users.service';

@Crud({
  model: {
    type: User,
  },
  dto: {
    create: CreateUserDto,
  },
  query: {
    exclude: ['password'],
  },
})
@ApiBearerAuth('JWT')
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
