import { Module } from '@nestjs/common';
import { MeddicalAppointemtsService } from './meddical_appointemts.service';
import { MeddicalAppointemtsController } from './meddical_appointemts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { medicalAppointments } from './entity/appointemnt.entity';

@Module({
  imports:[TypeOrmModule.forFeature([medicalAppointments])],
  controllers: [MeddicalAppointemtsController],
  providers: [MeddicalAppointemtsService],
})
export class MeddicalAppointemtsModule {}
