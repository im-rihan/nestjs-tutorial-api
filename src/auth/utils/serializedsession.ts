import { PassportSerializer } from '@nestjs/passport';
import { Inject } from '@nestjs/common';
import { UsersService } from './../../users/users.service';
import { UserEntity } from './../../typeorm/user-entity';

export class SessionSerializer extends PassportSerializer {
  constructor(@Inject('USER_SERVICE') private userService: UsersService) {
    super();
  }
  async serializeUser(user: UserEntity, done: (err, user: UserEntity) => void) {
    done(null, user);
  }

  async deserializeUser(
    user: UserEntity,
    done: (err, user: UserEntity) => void,
  ) {
    const userDb = await this.userService.findUserByUserId(user.id);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
