import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './../typeorm/user-entity';
import { LocalStrategy } from './utils/localStrategy';
import { SessionSerializer } from './utils/serializedsession';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
