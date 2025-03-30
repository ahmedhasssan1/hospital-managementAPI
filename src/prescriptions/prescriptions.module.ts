import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { prescriptions } from './entity/prescripttion.entity';
import { Patient } from 'src/patients/typeOrm/patient.entity';
import { Doctor } from 'src/doctor/typeOrm/doctor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([prescriptions,Patient,Doctor]),],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],

})
export class PrescriptionsModule {}
