import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './typeOrm/patient.entity';
import { Doctor } from 'src/doctor/typeOrm/doctor.entity';
import { Room } from 'src/rooms/entity/room.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Patient,Doctor,Room])],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports:[PatientsService]
})
export class PatientsModule {}
