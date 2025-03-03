import { Module } from '@nestjs/common';
import { MeddicalAppointemtsService } from './meddical_appointemts.service';
import { MeddicalAppointemtsController } from './meddical_appointemts.controller';

@Module({
  controllers: [MeddicalAppointemtsController],
  providers: [MeddicalAppointemtsService],
})
export class MeddicalAppointemtsModule {}
