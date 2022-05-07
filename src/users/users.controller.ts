import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private usersService: UsersService) {}

  @Get('')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':username')
  getUserByUserName(@Param('username') username: string) {
    return this.usersService.getUserByUserName(username);
  }
}
