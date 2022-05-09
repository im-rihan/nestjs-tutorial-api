import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('i m in validate');
    console.log(username, password);
    const userName = username.toLowerCase();
    const user = await this.authService.validateUser(userName, password);
    console.log(user);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
