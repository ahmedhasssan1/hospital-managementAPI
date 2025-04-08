import { Module } from '@nestjs/common';
import { MeddicalAppointemtsService } from './meddical_appointemts.service';
import { MeddicalAppointemtsController } from './meddical_appointemts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { medicalAppointments } from './entity/appointemnt.entity';
import { Patient } from 'src/patients/typeOrm/patient.entity';

@Module({
  imports:[TypeOrmModule.forFeature([medicalAppointments,Patient])],
  controllers: [MeddicalAppointemtsController],
  providers: [MeddicalAppointemtsService],
})
export class MeddicalAppointemtsModule {}
