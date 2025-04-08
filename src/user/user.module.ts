import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entitiy/users.entity';
import { UserController } from './user.controller';
import { userServices } from './user.service';
import { Doctor } from 'src/doctor/typeOrm/doctor.entity';
import { Nurse } from 'src/nurse/typeorm/nurse.entity';
import { Patient } from 'src/patients/typeOrm/patient.entity';
import { Room } from 'src/rooms/entity/room.entity';
import { RoomsModule } from 'src/rooms/rooms.module';
import { Admin } from 'src/admin/entity/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Doctor, Nurse, Patient, Room, Admin]),
    RoomsModule,
  ],
  controllers: [UserController],
  providers: [userServices],
  exports: [userServices],
})
export class UserModule {}
