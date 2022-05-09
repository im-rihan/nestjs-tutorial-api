import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/localGuard';
import { Request as ExpRequest } from 'express';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.userDb;
  }

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log('i m in get auth session');
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  getStatus(@Req() req: ExpRequest) {
    return req.user;
  }
}
