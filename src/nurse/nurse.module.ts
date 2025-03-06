import { Module } from '@nestjs/common';
import { NurseService } from './nurse.service';
import { NurseController } from './nurse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nurse } from './typeorm/nurse.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Nurse])],
  controllers: [NurseController],
  providers: [NurseService],
})
export class NurseModule {}
