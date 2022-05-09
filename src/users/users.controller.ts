import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SerializesUser } from './types/user.model';
import { UsersService } from './users.service';
import { UserNotFoundException } from './Exceptions/user-not-found.exception';
import { HttpStatusFilter } from './filters/http-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticatedGuard } from '../auth/utils/localGuard';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('username/:username')
  getUserByUserName(@Param('username') username: string) {
    const user = this.usersService.getUserByUserName(username);
    if (user) return new SerializesUser(user);
    else throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpStatusFilter)
  @Get('id/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUserById(id);
    if (user) return new SerializesUser(user);
    else throw new UserNotFoundException();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('all-users')
  getAllRepository() {
    return this.usersService.getALlUserRepository();
  }
}
