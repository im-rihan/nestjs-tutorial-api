import { Module } from '@nestjs/common';
import { CostomersModule } from './costomers/costomers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CostomersModule, UsersModule],
})
export class AppModule {}
