import { Module } from '@nestjs/common';
import { CostomersController } from './costomers.controller';
import { CostomersService } from './costomers.service';

@Module({
  controllers: [CostomersController],
  providers: [CostomersService]
})
export class CostomersModule {}
