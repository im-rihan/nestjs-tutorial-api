import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CostomersController } from './costomers.controller';
import { CostomersService } from './costomers.service';
import { ValidateCostomersMiddleware } from './midldlewares/validate-costomers.middleware';
import { ValidateCostomersAccountMiddleware } from './midldlewares/validate-costomers-account.middleware';

@Module({
  controllers: [CostomersController],
  providers: [CostomersService],
})
export class CostomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCostomersMiddleware, ValidateCostomersAccountMiddleware)
      .exclude({
        path: 'costomers/create',
        method: RequestMethod.POST,
      })
      .forRoutes(CostomersController);
  }
}
