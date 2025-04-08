import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './typeOrm/doctor.entity';
import { Nurse } from 'src/nurse/typeorm/nurse.entity';
import { NurseModule } from 'src/nurse/nurse.module';
import { PatientsModule } from 'src/patients/patients.module';
import { MeddicalAppointemtsModule } from 'src/meddical_appointemts/meddical_appointemts.module';
import { prescriptions } from 'src/prescriptions/entity/prescripttion.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Doctor,Nurse,prescriptions]),
  NurseModule,PatientsModule,MeddicalAppointemtsModule,
],
  controllers: [DoctorController],
  providers: [DoctorService],

  
})
export class DoctorModule {}
