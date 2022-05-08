import { Inject, Injectable } from '@nestjs/common';
import { comparePassword } from 'src/utils/bcrypt';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const userDb = await this.userService.findUserByUsername(username);
    if (userDb) {
      const matched = comparePassword(password, userDb.password);
      if (matched) {
        console.log('user validation success');
        return userDb;
      } else {
        console.log('Password Donot Matched');
        return null;
      }
    } else {
      console.log('Authorization Failed !');
      return null;
    }
  }
}
