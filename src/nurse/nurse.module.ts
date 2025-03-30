import { Module } from '@nestjs/common';
import { NurseService } from './nurse.service';
import { NurseController } from './nurse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nurse } from './typeorm/nurse.entity';
import { User } from 'src/common/entities/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Nurse,User])],
  controllers: [NurseController],
  providers: [NurseService],
  exports:[NurseService]
})
export class NurseModule {}
