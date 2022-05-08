import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './../typeorm/user-entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/localStrategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule],
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
  ],
})
export class AuthModule {}
