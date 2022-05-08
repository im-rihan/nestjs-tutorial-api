import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostomersModule } from './costomers/costomers.module';
import { UsersModule } from './users/users.module';
import entities from './typeorm/index';

@Module({
  imports: [
    CostomersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '78626458',
      database: 'nestjs_tutorial_db',
      entities,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
