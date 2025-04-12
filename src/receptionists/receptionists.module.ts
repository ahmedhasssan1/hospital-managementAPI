import { Module } from '@nestjs/common';
import { ReceptionistsService } from './receptionists.service';
import { ReceptionistsController } from './receptionists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { receptionist } from './entity/receptionist.entity';
import { User } from 'src/user/entitiy/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([receptionist,User])],
  controllers: [ReceptionistsController],
  providers: [ReceptionistsService],
})
export class ReceptionistsModule {}
