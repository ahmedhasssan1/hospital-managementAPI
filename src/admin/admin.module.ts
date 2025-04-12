import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { User } from 'src/user/entitiy/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Admin,User])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
